
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, donorName, donorEmail, donationType, paymentMethod } = await req.json();
    
    // Validate required fields
    if (!amount || !donorName || !donorEmail || !donationType || !paymentMethod) {
      return new Response(
        JSON.stringify({ error: 'Dados incompletos para o processamento da doação' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: donationType === 'one-time' ? 'Doação única' : 'Doação mensal',
              description: `Doação para A Casa da Alquimia`,
            },
            unit_amount: Math.round(parseFloat(amount) * 100), // Convert to cents
            recurring: donationType === 'monthly' ? { interval: 'month' } : undefined,
          },
          quantity: 1,
        },
      ],
      mode: donationType === 'one-time' ? 'payment' : 'subscription',
      success_url: `${req.headers.get('origin')}/?success=true`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      customer_email: donorEmail,
      metadata: {
        donor_name: donorName,
        donor_email: donorEmail,
        donation_type: donationType,
        payment_method: paymentMethod,
      },
    });

    // Return the checkout URL to redirect the user
    return new Response(
      JSON.stringify({ 
        checkoutUrl: session.url,
        sessionId: session.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Erro ao processar a doação:', error);
    return new Response(
      JSON.stringify({ error: 'Falha ao processar a doação' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
