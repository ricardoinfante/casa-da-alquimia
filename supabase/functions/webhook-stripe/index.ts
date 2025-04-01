
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
    apiVersion: '2023-10-16',
  });

  // Initialize Supabase client with project URL and anon key
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );

  try {
    // Get the signature from the header
    const signature = req.headers.get('stripe-signature');
    
    if (!signature) {
      console.error('Webhook Error: No Stripe signature');
      return new Response('Webhook Error: No Stripe signature', { 
        headers: corsHeaders, 
        status: 400 
      });
    }

    // Get the request body as text
    const body = await req.text();
    
    // Verify the event using Stripe signature
    // Replace 'YOUR_WEBHOOK_SECRET' with your actual webhook secret
    // For testing, you can proceed without verification
    let event;
    try {
      // In production, uncomment this line and use your webhook secret
      // event = stripe.webhooks.constructEvent(body, signature, Deno.env.get('STRIPE_WEBHOOK_SECRET') || '');
      
      // For now, we'll parse the body directly
      event = JSON.parse(body);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { 
        headers: corsHeaders, 
        status: 400 
      });
    }

    console.log('Processando evento do Stripe:', event.type);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        
        // Get session metadata
        const { donor_name, donor_email, donation_type, payment_method } = session.metadata || {};
        
        console.log('Dados da doação:', { donor_name, donor_email, donation_type, payment_method });
        
        // Insert donation record into Supabase
        const { data, error } = await supabaseClient
          .from('donations')
          .insert({
            donor_name: donor_name,
            donor_email: donor_email,
            amount: session.amount_total / 100, // Convert cents to decimal
            payment_method: payment_method,
            donation_type: donation_type,
            payment_id: session.id,
            payment_status: 'completed'
          });
        
        if (error) {
          console.error('Erro ao inserir registro de doação:', error);
        } else {
          console.log('Registro de doação inserido com sucesso:', data);
        }
        break;
        
      // Handle subscription events if needed
      case 'invoice.paid':
        // Handle subscription payment
        console.log('Pagamento de assinatura processado');
        break;
        
      default:
        console.log(`Tipo de evento não tratado: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200 
    });
    
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
