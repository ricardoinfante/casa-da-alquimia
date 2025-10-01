import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

interface Evento {
  id: number;
  titulo: string;
  data: string;
  descricao: string;
  tipo: "Evento" | "Trabalho" | "Feitio";
  imagem_url?: string | null;
  created_at?: string;
}

const exemplos: Evento[] = [];

const Eventos = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState<Evento[]>(exemplos);
  const [form, setForm] = useState({ titulo: "", data: "", descricao: "", tipo: "Evento" as Evento["tipo"], imagem: null as File | null });
  const [formError, setFormError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

  // Autenticação: checar usuário logado
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  // Buscar eventos do Supabase
  useEffect(() => {
    async function fetchEventos() {
      setLoading(true);
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .order("data", { ascending: true });
      if (!error && data) setEventos(data as Evento[]);
      setLoading(false);
    }
    fetchEventos();
  }, []);

  // Função de login
  async function handleLogin(email: string, password: string) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Erro ao logar: " + error.message);
    setLoading(false);
  }

  // Função de logout
  async function handleLogout() {
    await supabase.auth.signOut();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm({ ...form, imagem: file });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    setFormError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.titulo || !form.data || !form.descricao) {
      setFormError("Preencha todos os campos para adicionar um evento.");
      return;
    }
    setFormError("");
    setLoading(true);
    let imagem_url: string | null = null;
    if (form.imagem) {
      const fileExt = form.imagem.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('eventos').upload(fileName, form.imagem);
      if (uploadError) {
        setFormError("Erro ao fazer upload da imagem: " + uploadError.message);
        setLoading(false);
        return;
      }
      imagem_url = supabase.storage.from('eventos').getPublicUrl(fileName).data.publicUrl;
    }
    const { error } = await supabase.from("eventos").insert([
      {
        titulo: form.titulo,
        data: form.data,
        descricao: form.descricao,
        tipo: form.tipo,
        imagem_url
      }
    ]);
    if (error) {
      setFormError("Erro ao adicionar evento: " + error.message);
      setLoading(false);
      return;
    }
    // Buscar eventos atualizados do banco
    const { data, error: fetchError } = await supabase
      .from("eventos")
      .select("*")
      .order("data", { ascending: true });
    if (!fetchError && data) setEventos(data as Evento[]);
    setForm({ titulo: "", data: "", descricao: "", tipo: "Evento", imagem: null });
    setLoading(false);
  }

  // Função para deletar evento no Supabase
  async function handleDelete(id: number) {
    const ok = confirm("Tem certeza que deseja excluir?");
    if (!ok) return;
    const { error } = await supabase.from("eventos").delete().eq("id", id);
    if (!error) setEventos(eventos => eventos.filter(e => e.id !== id));
  }

  // Componente de login
  function LoginForm({ onLogin, loading }: { onLogin: (email: string, password: string) => void, loading: boolean }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
      <form onSubmit={e => { e.preventDefault(); onLogin(email, password); }} className="flex gap-2">
        <Input type="email" placeholder="Email admin" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit" disabled={loading}>Entrar</Button>
      </form>
    );
  }

  return (
    <>
      <Navbar />
      <div className="section-container py-16">
        <div className="flex justify-end mb-4 gap-2">
          <Button variant="outline" onClick={() => navigate("/")}>Voltar para Início</Button>
          {user ? (
            <Button variant="secondary" onClick={handleLogout}>Sair</Button>
          ) : (
            <LoginForm onLogin={handleLogin} loading={loading} />
          )}
        </div>
        <h1 className="font-display text-3xl mb-6">Eventos, Trabalhos e Feitio</h1>
        <p className="text-foreground/70 mb-8">Registre e visualize os próximos eventos, trabalhos e feitios da Casa da Alquimia.</p>
        {user && (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 mb-10 bg-muted/30 p-6 rounded-lg shadow" encType="multipart/form-data">
            <Input
              name="titulo"
              placeholder="Título do evento"
              value={form.titulo}
              onChange={handleChange}
              className="md:col-span-1"
              required
            />
            <Input
              name="data"
              type="date"
              value={form.data}
              onChange={handleChange}
              className="md:col-span-1"
              required
            />
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="md:col-span-1 border rounded-md px-3 py-2 bg-background text-base text-foreground/80"
              required
            >
              <option value="Evento">Evento</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Feitio">Feitio</option>
            </select>
            <Input
              name="imagem"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="md:col-span-1"
            />
            <Button type="submit" className="md:col-span-1 w-full">Adicionar</Button>
            <textarea
              name="descricao"
              placeholder="Descrição"
              value={form.descricao}
              onChange={handleChange}
              className="md:col-span-4 mt-2 rounded-md border px-3 py-2 bg-background text-base text-foreground/80"
              rows={2}
              required
            />
            {formError && (
              <div className="md:col-span-4 text-red-600 text-sm mt-2">{formError}</div>
            )}
          </form>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {eventos.map((evento) => (
            <Card
              key={evento.id}
              className="hover:scale-[1.03] transition-transform duration-200 shadow-lg border-2 border-transparent hover:border-primary/40 cursor-pointer"
              onClick={() => { console.log('Card clicado', evento); setSelectedEvento(evento); }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">{evento.tipo}</span>
                  {evento.titulo}
                </CardTitle>
                <CardDescription className="text-sm text-foreground/60">{new Date(evento.data).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                {evento.imagem_url && (
                  <img src={evento.imagem_url} alt={evento.titulo} className="mb-2 rounded w-full max-h-48 object-cover" />
                )}
                <p className="text-foreground/80 text-base min-h-[60px]">{evento.descricao}</p>
              </CardContent>
              <CardFooter>
                {user && (
                  <>
                    <Button variant="outline" size="sm" className="ml-auto">Editar</Button>
                    <Button variant="destructive" size="sm" className="ml-2" onClick={e => { e.stopPropagation(); handleDelete(evento.id); }}>
                      Excluir
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Modal de detalhes */}
        {selectedEvento && typeof window !== 'undefined' && createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-2 md:px-0" onClick={() => setSelectedEvento(null)}>
            <div
              className="bg-background rounded-lg shadow-2xl max-w-lg w-full md:w-[520px] p-0 relative animate-in fade-in zoom-in overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-foreground/60 hover:text-primary text-2xl font-bold z-10"
                onClick={() => setSelectedEvento(null)}
                aria-label="Fechar"
              >×</button>
              <div className="flex flex-col items-center w-full">
                {selectedEvento.imagem_url ? (
                  <img src={selectedEvento.imagem_url} alt={selectedEvento.titulo} className="w-full h-[320px] object-cover" />
                ) : (
                  <div className="w-full h-[320px] flex items-center justify-center bg-muted text-muted-foreground">Sem imagem</div>
                )}
                <div className="w-full p-6 flex flex-col items-center gap-2">
                  <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">{selectedEvento.tipo}</span>
                  <h2 className="text-2xl font-bold text-center">{selectedEvento.titulo}</h2>
                  <div className="text-foreground/60 text-sm">{new Date(selectedEvento.data).toLocaleDateString()}</div>
                  <hr className="my-2 w-1/2 border-foreground/10" />
                  <p className="text-foreground/80 text-base text-center whitespace-pre-line mt-2">{selectedEvento.descricao}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </>
  );
};

export default Eventos;
