import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  useNavigate,
  useParams
} from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './index.css';

const U = import.meta.env.VITE_SUPABASE_URL;
const K = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const S = U && K ? createClient(U, K) : null;

/* =========================
   LOGO
========================= */

const Logo = () => (
  <Link
    to="/"
    className="logo"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      width: 'auto',
      height: '100%',
      margin: '0',
      flexShrink: 0,
      overflow: 'hidden'
    }}
  >
    <img
      src="/images/logo-sospet.png"
      alt=""
      style={{
        display: 'block',
        height: '70px',
        width: 'auto',
        maxWidth: '180px',
        objectFit: 'contain',
        objectPosition: 'center'
      }}
    />
  </Link>
);

/* =========================
   AUTH LAYOUT
========================= */

function AuthLayout({ children }) {
  return (
    <div className="auth">
      <div className="auth-side">
        <Logo />

        <h2>Tecnologia a favor da vida.</h2>

        <p>
          Identificação inteligente para ajudar seu pet a voltar para casa.
        </p>
      </div>

      {children}
    </div>
  );
}

/* =========================
   LOGIN
========================= */
function Login() {
  const nav = useNavigate();

  const [email, setE] = useState('');
  const [pass, setP] = useState('');
  const [err, setErr] = useState('');
  const [load, setL] = useState(false);

  async function go(e) {
    e.preventDefault();

    setL(true);
    setErr('');

    if (!S) {
      setErr('Configure o Supabase primeiro.');
      setL(false);
      return;
    }

    const { error } = await S.auth.signInWithPassword({
      email,
      password: pass
    });

    setL(false);

    if (error) {
      setErr(error.message);
    } else {
      nav('/pets');
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#0B0B0B',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: '#151515',
          border: '1px solid #2A2A2A',
          borderRadius: '22px',
          padding: '30px 24px',
          boxSizing: 'border-box',
          boxShadow:
            '0 10px 35px rgba(0, 0, 0, 0.4)'
        }}
      >

        {/* LOGO */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '24px'
          }}
        >
          <Logo />
        </div>

        {/* TÍTULO */}

        <h1
          style={{
            margin: '0 0 8px',
            textAlign: 'center',
            color: '#B8B8B8',
            fontSize: '28px',
            fontWeight: '700'
          }}
        >
          Entrar
        </h1>

        <p
          style={{
            margin: '0 0 26px',
            textAlign: 'center',
            color: '#777777',
            fontSize: '14px'
          }}
        >
          Acesse sua conta SOSPet.
        </p>

        {/* FORMULÁRIO */}

        <form
          onSubmit={go}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >

          {/* E-MAIL */}

          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
              color: '#A0A0A0',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            E-mail

            <input
              type="email"
              required
              value={email}
              onChange={e => setE(e.target.value)}
              style={{
                width: '100%',
                height: '48px',
                padding: '0 14px',
                boxSizing: 'border-box',
                background: '#0B0B0B',
                border: '1px solid #333333',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </label>

          {/* SENHA */}

          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
              color: '#A0A0A0',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Senha

            <input
              type="password"
              required
              value={pass}
              onChange={e => setP(e.target.value)}
              style={{
                width: '100%',
                height: '48px',
                padding: '0 14px',
                boxSizing: 'border-box',
                background: '#0B0B0B',
                border: '1px solid #333333',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </label>

          {/* ERRO */}

          {err && (
            <div
              className="err"
              style={{
                padding: '12px',
                borderRadius: '10px',
                background: '#2A1010',
                border: '1px solid #542020',
                color: '#FF7777',
                fontSize: '13px',
                lineHeight: '1.4'
              }}
            >
              {err}
            </div>
          )}

          {/* BOTÃO */}

          <button
            type="submit"
            className="primary"
            disabled={load}
            style={{
              width: '100%',
              height: '50px',
              marginTop: '4px',
              border: 'none',
              borderRadius: '12px',
              background: '#FFFFFF',
              color: '#0B0B0B',
              fontSize: '15px',
              fontWeight: '700',
              cursor: load
                ? 'not-allowed'
                : 'pointer',
              opacity: load ? 0.6 : 1
            }}
          >
            {load ? 'Entrando...' : 'Entrar'}
          </button>

        </form>

        {/* CADASTRO */}

        <div
          style={{
            marginTop: '24px',
            textAlign: 'center',
            color: '#777777',
            fontSize: '13px'
          }}
        >
          Não tem conta?{' '}

          <Link
            to="/cadastro"
            style={{
              color: '#B8B8B8',
              fontWeight: '700',
              textDecoration: 'none'
            }}
          >
            Criar conta
          </Link>
        </div>

      </div>
    </div>
  );
}

/* =========================
   CADASTRO
========================= */

function Register() {
  const nav = useNavigate();

  const [name, setN] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setE] = useState('');
  const [pass, setP] = useState('');
  const [msg, setM] = useState('');
  const [loading, setLoading] = useState(false);

  async function go(e) {
    e.preventDefault();

    setM('');
    setLoading(true);

    if (!S) {
      setM('Configure o Supabase primeiro.');
      setLoading(false);
      return;
    }

    const { data, error } = await S.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          nome: name,
          telefone: phone
        }
      }
    });

    setLoading(false);

    if (error) {
      setM(error.message);
      return;
    }

    if (data.session) {
      nav('/pets');
      return;
    }

    nav(
      '/confirmar-email?email=' +
        encodeURIComponent(email)
    );
  }

  return (
    <AuthLayout>
      <div className="card">
        <Logo />

        <h1>Criar conta</h1>

        <p>Comece a proteger seus pets.</p>

        <form onSubmit={go}>
          <label>
            Nome completo
            <input
              required
              value={name}
              onChange={e => setN(e.target.value)}
              placeholder="Seu nome"
            />
          </label>

          <label>
            WhatsApp / Telefone
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="(13) 99999-9999"
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              required
              value={email}
              onChange={e => setE(e.target.value)}
              placeholder="seu@email.com"
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              minLength="6"
              required
              value={pass}
              onChange={e => setP(e.target.value)}
              placeholder="Mínimo de 6 caracteres"
            />
          </label>

          {msg && <div className="err">{msg}</div>}

          <button
            className="primary"
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <small>
          Já possui conta?{' '}
          <Link to="/login">Entrar</Link>
        </small>
      </div>
    </AuthLayout>
  );
}

/* =========================
   CONFIRMAÇÃO DE E-MAIL
========================= */

function ConfirmEmail() {
  const nav = useNavigate();

  const params = new URLSearchParams(
    window.location.search
  );

  const email = params.get('email') || '';

  const [token, setToken] = useState('');
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function verify(e) {
    e.preventDefault();

    setErr('');
    setMsg('');

    if (!S) {
      setErr('Configure o Supabase primeiro.');
      return;
    }

    if (!email) {
      setErr('E-mail não encontrado.');
      return;
    }

    if (token.length !== 6) {
      setErr('Digite o código de 6 dígitos.');
      return;
    }

    setLoading(true);

    const { data, error } = await S.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });

    if (error) {
      console.error(error);

      setErr(
        'Código inválido ou expirado. Confira o código enviado para seu e-mail.'
      );

      setLoading(false);
      return;
    }

    /*
      Atualizamos o perfil com os dados
      que foram enviados durante o cadastro.
    */

    if (data.user) {
      const nome =
        data.user.user_metadata?.nome || '';

      const telefone =
        data.user.user_metadata?.telefone || '';

      await S
        .from('profiles')
        .update({
          nome,
          telefone
        })
        .eq('id', data.user.id);
    }

    setLoading(false);

    nav('/pets');
  }

  async function resend() {
    setErr('');
    setMsg('');

    if (!S) {
      setErr('Configure o Supabase primeiro.');
      return;
    }

    if (!email) {
      setErr('E-mail não encontrado.');
      return;
    }

    setResending(true);

    const { error } = await S.auth.resend({
      type: 'signup',
      email
    });

    setResending(false);

    if (error) {
      setErr(error.message);
      return;
    }

    setMsg(
      'Novo código enviado para seu e-mail.'
    );
  }

  return (
    <AuthLayout>
      <div className="card confirm-card">
        <Logo />

        <div className="confirm-icon">
          ✉️
        </div>

        <h1>Confirme seu e-mail</h1>

        <p>
          Enviamos um código de 6 dígitos para:
        </p>

        <strong className="confirm-email">
          {email}
        </strong>

        <form onSubmit={verify}>
          <label>
            Código de confirmação

            <input
              className="otp-input"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength="6"
              placeholder="000000"
              value={token}
              onChange={e =>
                setToken(
                  e.target.value.replace(/\D/g, '')
                )
              }
            />
          </label>

          {err && (
            <div className="err">
              {err}
            </div>
          )}

          {msg && (
            <div className="success-message">
              {msg}
            </div>
          )}

          <button
            className="primary"
            disabled={loading}
          >
            {loading
              ? 'Verificando...'
              : 'Confirmar e-mail'}
          </button>
        </form>

        <button
          type="button"
          className="link-button"
          onClick={resend}
          disabled={resending}
        >
          {resending
            ? 'Enviando...'
            : 'Reenviar código'}
        </button>

        <small>
          E-mail incorreto?{' '}
          <Link to="/cadastro">
            Voltar ao cadastro
          </Link>
        </small>
      </div>
    </AuthLayout>
  );
}

/* =========================
   SHELL
========================= */

function Shell({ children }) {
  return (
    <>
      <header
        className="app-header"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          padding: '15px 0 5px',

          background: '#0B0B0B',
          color: '#FFFFFF',

          borderBottom: '1px solid #1F1F1F'
        }}
      >
        <Logo />
      </header>

      <main
        className="app-main"
        style={{
          minHeight: '100vh',

          paddingBottom: '100px',

          background: '#0B0B0B',
          color: '#FFFFFF'
        }}
      >
        {children}
      </main>

      <nav
        className="bottom-nav"
        style={{
          position: 'fixed',
          left: '50%',
          bottom: '16px',
          transform: 'translateX(-50%)',

          width: 'min(75%, 380px)',
          minHeight: '55px',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',

          padding: '5px 8px',

          /* FUNDO DA NAVEGAÇÃO */
          background: '#151515',

          /* BORDA */
          border: '1px solid #2A2A2A',
          borderRadius: '18px',

          /* SOMBRA */
          boxShadow:
            '0 8px 25px rgba(0, 0, 0, 0.45)',

          zIndex: 9999
        }}
      >
        <NavLink
          to="/pets"
          className={({ isActive }) =>
            'bottom-nav-item' +
            (isActive ? ' active' : '')
          }
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            gap: '2px',
            padding: '5px 4px',

            textDecoration: 'none',

            /* COR PADRÃO */
            color: '#A0A0A0',

            borderRadius: '12px',

            fontSize: '11px',
            fontWeight: '600'
          }}
        >
          <span
            className="bottom-nav-icon"
            style={{
              fontSize: '19px',
              lineHeight: '1'
            }}
          >
            🐾
          </span>

          <span>Meus Pets</span>
        </NavLink>

        <NavLink
          to="/pets/novo"
          className={({ isActive }) =>
            'bottom-nav-item' +
            (isActive ? ' active' : '')
          }
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            gap: '2px',
            padding: '5px 4px',

            textDecoration: 'none',

            color: '#A0A0A0',

            borderRadius: '12px',

            fontSize: '11px',
            fontWeight: '600'
          }}
        >
          <span
            className="bottom-nav-icon"
            style={{
              fontSize: '19px',
              lineHeight: '1'
            }}
          >
            ＋
          </span>

          <span>Cadastrar Pet</span>
        </NavLink>

        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            'bottom-nav-item' +
            (isActive ? ' active' : '')
          }
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            gap: '2px',
            padding: '5px 4px',

            textDecoration: 'none',

            color: '#A0A0A0',

            borderRadius: '12px',

            fontSize: '11px',
            fontWeight: '600'
          }}
        >
          <span
            className="bottom-nav-icon"
            style={{
              fontSize: '19px',
              lineHeight: '1'
            }}
          >
            👤
          </span>

          <span>Perfil</span>
        </NavLink>
      </nav>
    </>
  );
}

/* =========================
   MEUS PETS
========================= */

function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setL] = useState(true);

  async function loadPets() {
    setL(true);

    const { data } = await S
      .from('pets')
      .select('*')
      .order('created_at', {
        ascending: false
      });

    setPets(data || []);
    setL(false);
  }

  useEffect(() => {
    loadPets();
  }, []);

  return (
    <div className="container">
      <div className="head">
        <div>
          <small>ÁREA DO TUTOR</small>

          <h1>Meus Pets</h1>
        </div>

        <Link
          className="primary btn"
          to="/pets/novo"
        >
          + Cadastrar pet
        </Link>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : pets.length ? (
        <div className="grid">
          {pets.map(p => (
            <Link
              className="pet"
              key={p.id}
              to={'/pets/' + p.id}
            >
              <div className="photo">
                {p.foto_url ? (
                  <img
                    src={p.foto_url}
                    alt={p.nome}
                  />
                ) : (
                  <span>🐾</span>
                )}
              </div>

              <div>
                <h3>{p.nome}</h3>

                <p>
                  {p.raca ||
                    'Raça não informada'}{' '}
                  · {p.sexo || ''}
                </p>

                <b
                  className={
                    p.status === 'Perdido'
                      ? 'lost'
                      : p.status ===
                        'Encontrado'
                      ? 'found'
                      : ''
                  }
                >
                  {p.status}
                </b>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Nenhum pet cadastrado</h2>

          <p>
            Cadastre seu primeiro pet.
          </p>

          <Link
            className="primary btn"
            to="/pets/novo"
          >
            Cadastrar pet
          </Link>
        </div>
      )}
    </div>
  );
}

/* =========================
   CADASTRAR PET
========================= */

function NewPet() {
  const nav = useNavigate();

  const [f, setF] = useState({
    nome: '',
    raca: '',
    sexo: 'Macho',
    caracteristicas: '',
    whatsapp: '',
    cidade: '',
    status: 'Normal',
    tag: ''
  });

  const [file, setFile] = useState();
  const [err, setErr] = useState('');

  const set = (k, v) =>
    setF(x => ({
      ...x,
      [k]: v
    }));

  async function go(e) {
    e.preventDefault();

    setErr('');

    const {
      data: { user }
    } = await S.auth.getUser();

    let tag_id = null;

    if (f.tag) {
      const { data, error } = await S
        .from('tags')
        .select('id')
        .eq('codigo', f.tag)
        .eq('ativa', true)
        .maybeSingle();

      if (error || !data) {
        return setErr(
          'Tag não encontrada.'
        );
      }

      tag_id = data.id;
    }

    let foto_url = null;

    if (file) {
      const ext =
        file.name.split('.').pop() ||
        'jpg';

      const path =
        `${user.id}/${crypto.randomUUID()}.${ext}`;

      const { error } = await S.storage
        .from('pet-fotos')
        .upload(path, file, {
          contentType: file.type
        });

      if (error) {
        return setErr(error.message);
      }

      foto_url = S.storage
        .from('pet-fotos')
        .getPublicUrl(path)
        .data.publicUrl;
    }

    const { error } = await S
      .from('pets')
      .insert({
        tutor_id: user.id,
        tag_id,
        nome: f.nome,
        foto_url,
        raca: f.raca || null,
        sexo: f.sexo,
        caracteristicas:
          f.caracteristicas || null,
        whatsapp: f.whatsapp || null,
        cidade: f.cidade || null,
        status: f.status
      });

    if (error) {
      setErr(error.message);
    } else {
      nav('/pets');
    }
  }

  return (
    <div className="container narrow">
      <Link to="/pets">
        ← Voltar
      </Link>

      <h1>Cadastrar Pet</h1>

      <form
        className="form"
        onSubmit={go}
      >
        <label>
          Nome *
          <input
            required
            value={f.nome}
            onChange={e =>
              set('nome', e.target.value)
            }
          />
        </label>

        <div className="row">
          <label>
            Raça
            <input
              value={f.raca}
              onChange={e =>
                set('raca', e.target.value)
              }
            />
          </label>

          <label>
            Sexo
            <select
              value={f.sexo}
              onChange={e =>
                set('sexo', e.target.value)
              }
            >
              <option>Macho</option>
              <option>Fêmea</option>
            </select>
          </label>
        </div>

        <label>
          Características
          <textarea
            value={f.caracteristicas}
            onChange={e =>
              set(
                'caracteristicas',
                e.target.value
              )
            }
          />
        </label>

        <div className="row">
          <label>
            WhatsApp
            <input
              value={f.whatsapp}
              onChange={e =>
                set(
                  'whatsapp',
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Cidade
            <input
              value={f.cidade}
              onChange={e =>
                set(
                  'cidade',
                  e.target.value
                )
              }
            />
          </label>
        </div>

        <div className="row">
          <label>
            Status
            <select
              value={f.status}
              onChange={e =>
                set(
                  'status',
                  e.target.value
                )
              }
            >
              <option>Normal</option>
              <option>Perdido</option>
              <option>Encontrado</option>
            </select>
          </label>

          <label>
            Tag
            <input
              placeholder="RF-00001"
              value={f.tag}
              onChange={e =>
                set('tag', e.target.value)
              }
            />
          </label>
        </div>

        <label>
          Foto
          <input
            type="file"
            accept="image/*"
            onChange={e =>
              setFile(
                e.target.files?.[0]
              )
            }
          />
        </label>

        {err && (
          <div className="err">
            {err}
          </div>
        )}

        <button className="primary">
          Salvar pet
        </button>
      </form>
    </div>
  );
}

/* =========================
   EDITAR PET
========================= */

function EditPet({
  pet,
  onCancel,
  onSaved
}) {
  const [f, setF] = useState({
    nome: pet.nome || '',
    raca: pet.raca || '',
    sexo: pet.sexo || 'Macho',
    caracteristicas:
      pet.caracteristicas || '',
    whatsapp: pet.whatsapp || '',
    cidade: pet.cidade || '',
    status: pet.status || 'Normal',
    tag: pet.tag_codigo || ''
  });

  const [file, setFile] = useState();
  const [err, setErr] = useState('');
  const [saving, setSaving] =
    useState(false);

  const set = (k, v) =>
    setF(x => ({
      ...x,
      [k]: v
    }));

  async function save(e) {
    e.preventDefault();

    setSaving(true);
    setErr('');

    try {
      let foto_url =
        pet.foto_url || null;

      if (file) {
        const {
          data: { user }
        } = await S.auth.getUser();

        const ext =
          file.name.split('.').pop() ||
          'jpg';

        const path =
          `${user.id}/${crypto.randomUUID()}.${ext}`;

        const {
          error: uploadError
        } = await S.storage
          .from('pet-fotos')
          .upload(path, file, {
            contentType: file.type
          });

        if (uploadError) {
          throw uploadError;
        }

        foto_url = S.storage
          .from('pet-fotos')
          .getPublicUrl(path)
          .data.publicUrl;
      }

      let tag_id = null;

      if (f.tag.trim()) {
        const {
          data: tagData,
          error: tagError
        } = await S
          .from('tags')
          .select('id')
          .eq('codigo', f.tag.trim())
          .eq('ativa', true)
          .maybeSingle();

        if (tagError) {
          throw tagError;
        }

        if (!tagData) {
          throw new Error(
            'Tag não encontrada.'
          );
        }

        tag_id = tagData.id;
      }

      const {
        data,
        error
      } = await S
        .from('pets')
        .update({
          nome: f.nome,
          foto_url,
          raca: f.raca || null,
          sexo: f.sexo,
          caracteristicas:
            f.caracteristicas || null,
          whatsapp:
            f.whatsapp || null,
          cidade:
            f.cidade || null,
          status: f.status,
          tag_id
        })
        .eq('id', pet.id)
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      /*
        Mantemos o novo código da tag
        para atualizar a tela imediatamente.
      */

      onSaved({
        ...data,
        tag_codigo:
          f.tag.trim() || ''
      });
    } catch (error) {
      setErr(
        error.message ||
          'Não foi possível salvar as alterações.'
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="edit-box">
      <h2>Editar pet</h2>

      <form
        className="form"
        onSubmit={save}
      >
        <label>
          Nome *
          <input
            required
            value={f.nome}
            onChange={e =>
              set(
                'nome',
                e.target.value
              )
            }
          />
        </label>

        <div className="row">
          <label>
            Raça
            <input
              value={f.raca}
              onChange={e =>
                set(
                  'raca',
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Sexo
            <select
              value={f.sexo}
              onChange={e =>
                set(
                  'sexo',
                  e.target.value
                )
              }
            >
              <option>Macho</option>
              <option>Fêmea</option>
            </select>
          </label>
        </div>

        <label>
          Características / Observações
          <textarea
            value={f.caracteristicas}
            onChange={e =>
              set(
                'caracteristicas',
                e.target.value
              )
            }
          />
        </label>

        <div className="row">
          <label>
            WhatsApp
            <input
              value={f.whatsapp}
              onChange={e =>
                set(
                  'whatsapp',
                  e.target.value
                )
              }
            />
          </label>

          <label>
            Cidade
            <input
              value={f.cidade}
              onChange={e =>
                set(
                  'cidade',
                  e.target.value
                )
              }
            />
          </label>
        </div>

        <label>
          Status
          <select
            value={f.status}
            onChange={e =>
              set(
                'status',
                e.target.value
              )
            }
          >
            <option>Normal</option>
            <option>Perdido</option>
            <option>Encontrado</option>
          </select>
        </label>

        <label>
          Tag
          <input
            placeholder="RF-00001"
            value={f.tag}
            onChange={e =>
              set(
                'tag',
                e.target.value
              )
            }
          />
        </label>

        <label>
          Nova foto
          <input
            type="file"
            accept="image/*"
            onChange={e =>
              setFile(
                e.target.files?.[0]
              )
            }
          />
        </label>

        {err && (
          <div className="err">
            {err}
          </div>
        )}

        <div className="edit-actions">
          <button
            type="button"
            className="secondary btn"
            onClick={onCancel}
            disabled={saving}
          >
            Cancelar
          </button>

          <button
            className="primary"
            disabled={saving}
          >
            {saving
              ? 'Salvando...'
              : 'Salvar alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}

/* =========================
   DETALHES DO PET
========================= */

function Detail() {
  const { id } = useParams();

  const [p, setP] = useState();
  const [loading, setLoading] =
    useState(true);
  const [editing, setEditing] =
    useState(false);
  const [err, setErr] =
    useState('');

  async function loadPet() {
    setLoading(true);
    setErr('');

    const {
      data,
      error
    } = await S
      .from('pets')
      .select(
        `
        *,
        tags:tag_id (
          codigo
        )
        `
      )
      .eq('id', id)
      .single();

    if (error) {
      setErr(error.message);
      setP(null);
    } else {
      setP({
        ...data,
        tag_codigo:
          data.tags?.codigo || ''
      });
    }

    setLoading(false);
  }

  useEffect(() => {
    loadPet();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        Carregando...
      </div>
    );
  }

  if (err) {
    return (
      <div className="container">
        <Link to="/pets">
          ← Voltar
        </Link>

        <div className="err">
          {err}
        </div>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="container">
        <Link to="/pets">
          ← Voltar
        </Link>

        <p>
          Pet não encontrado.
        </p>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="container narrow">
        <Link to="/pets">
          ← Voltar
        </Link>

        <EditPet
          pet={p}
          onCancel={() =>
            setEditing(false)
          }
          onSaved={updated => {
            setP(updated);
            setEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="container narrow">
      <Link to="/pets">
        ← Voltar
      </Link>

      <div className="detail">
        <div className="photo big">
          {p.foto_url ? (
            <img
              src={p.foto_url}
              alt={p.nome}
            />
          ) : (
            <span>🐾</span>
          )}
        </div>

        <h1>{p.nome}</h1>

        <p>
          {p.raca ||
            'Raça não informada'}{' '}
          · {p.sexo}
        </p>

        <b
          className={
            p.status === 'Perdido'
              ? 'lost'
              : p.status ===
                'Encontrado'
              ? 'found'
              : ''
          }
        >
          {p.status}
        </b>

        {p.caracteristicas && (
          <div className="info">
            <b>Observações</b>

            <p>
              {p.caracteristicas}
            </p>
          </div>
        )}

        {p.whatsapp && (
          <div className="info">
            <b>WhatsApp</b>

            <p>{p.whatsapp}</p>
          </div>
        )}

        {p.cidade && (
          <div className="info">
            <b>Cidade</b>

            <p>{p.cidade}</p>
          </div>
        )}

        {p.tag_codigo && (
          <div className="info">
            <b>Tag</b>

            <p>{p.tag_codigo}</p>
          </div>
        )}

        <div className="edit-actions">
          <button
            className="primary"
            onClick={() =>
              setEditing(true)
            }
          >
            ✏️ Editar pet
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   PERFIL
========================= */

function Profile({ onOut }) {
  const [p, setP] = useState({
    nome: '',
    telefone: '',
    email: ''
  });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    async function load() {
      const {
        data: { user }
      } = await S.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const {
        data
      } = await S
        .from('profiles')
        .select(
          'nome,telefone'
        )
        .eq('id', user.id)
        .single();

      setP({
        nome:
          data?.nome ||
          user.user_metadata?.nome ||
          '',
        telefone:
          data?.telefone ||
          user.user_metadata?.telefone ||
          '',
        email:
          user.email || ''
      });

      setLoading(false);
    }

    load();
  }, []);

  async function save(e) {
    e.preventDefault();

    setSaving(true);
    setSaved(false);

    const {
      data: { user }
    } = await S.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    const {
      error
    } = await S
      .from('profiles')
      .update({
        nome: p.nome,
        telefone: p.telefone
      })
      .eq('id', user.id);

    setSaving(false);

    if (!error) {
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  }

  if (loading) {
    return (
      <div className="container">
        Carregando perfil...
      </div>
    );
  }

  const initial =
    p.nome
      ? p.nome
          .charAt(0)
          .toUpperCase()
      : '👤';

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {initial}
        </div>

        <div>
          <small>
            MINHA CONTA
          </small>

          <h1>Meu perfil</h1>

          <p>
            Gerencie seus dados pessoais.
          </p>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-section-title">
          <span>👤</span>

          <div>
            <h2>
              Dados pessoais
            </h2>

            <p>
              Mantenha suas informações
              atualizadas.
            </p>
          </div>
        </div>

        <form
          className="form profile-form"
          onSubmit={save}
        >
          <label>
            Nome completo

            <input
              required
              value={p.nome}
              onChange={e =>
                setP({
                  ...p,
                  nome:
                    e.target.value
                })
              }
            />
          </label>

          <label>
            WhatsApp / Telefone

            <input
              type="tel"
              required
              value={p.telefone}
              onChange={e =>
                setP({
                  ...p,
                  telefone:
                    e.target.value
                })
              }
              placeholder="(13) 99999-9999"
            />
          </label>

          <label>
            E-mail

            <input
              type="email"
              value={p.email}
              disabled
            />

            <small className="field-help">
              O e-mail da conta não
              pode ser alterado aqui.
            </small>
          </label>

          {saved && (
            <div className="success-message">
              ✓ Dados salvos com sucesso.
            </div>
          )}

          <button
            className="primary"
            disabled={saving}
          >
            {saving
              ? 'Salvando...'
              : 'Salvar alterações'}
          </button>
        </form>
      </div>

      <div className="profile-card account-card">
        <div className="profile-section-title">
          <span>🔐</span>

          <div>
            <h2>
              Segurança
            </h2>

            <p>
              Sua conta utiliza autenticação
              segura da SOSPet.
            </p>
          </div>
        </div>
      </div>

      <button
        className="logout-button"
        onClick={onOut}
      >
        Sair da conta
      </button>
    </div>
  );
}

/* =========================
   PÁGINA PÚBLICA DA TAG
========================= */

function Public() {
  const { code } = useParams();

  const [p, setP] = useState();
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      const {
        data,
        error
      } = await S.rpc(
        'get_public_pet_by_tag',
        {
          tag_code: code
        }
      );

      if (error) {
        console.error(error);

        return setErr(
          'Erro ao consultar a tag.'
        );
      }

      const pet = data?.[0];

      if (!pet) {
        return setErr(
          'Nenhum pet associado a esta tag.'
        );
      }

      setP(pet);
    })();
  }, [code]);

  /* =====================
     ERRO
  ===================== */

  if (err) {
    return (
      <div
        className="public"
        style={{
          minHeight: '100vh',
          width: '100%',
          background: '#0B0B0B',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
          boxSizing: 'border-box'
        }}
      >
        <div
          className="public-card"
          style={{
            width: '100%',
            maxWidth: '420px',
            background: '#151515',
            border: '1px solid #2A2A2A',
            borderRadius: '20px',
            padding: '28px 22px',
            boxSizing: 'border-box',
            textAlign: 'center',
            color: '#FFFFFF'
          }}
        >
          <Logo />

          <h1
            style={{
              color: '#FFFFFF',
              marginTop: '24px'
            }}
          >
            Ops!
          </h1>

          <p
            style={{
              color: '#A0A0A0'
            }}
          >
            {err}
          </p>
        </div>
      </div>
    );
  }

  /* =====================
     CARREGANDO
  ===================== */

  if (!p) {
    return (
      <div
        className="public"
        style={{
          minHeight: '100vh',
          width: '100%',
          background: '#0B0B0B',
          color: '#A0A0A0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
          boxSizing: 'border-box'
        }}
      >
        Carregando...
      </div>
    );
  }

  /* =====================
     PÁGINA PÚBLICA DO PET
  ===================== */

  return (
    <div
      className={
        'public ' +
        (p.status === 'Perdido'
          ? 'lost-bg'
          : '')
      }
      style={{
        minHeight: '100vh',
        width: '100%',
        background:
          p.status === 'Perdido'
            ? '#1A0B0B'
            : '#0B0B0B',
        color: '#FFFFFF',
        padding: '24px 16px 40px',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="public-card"
        style={{
          width: '100%',
          maxWidth: '420px',
          margin: '0 auto',
          background: '#151515',
          border: '1px solid #2A2A2A',
          borderRadius: '22px',
          padding: '24px 20px',
          boxSizing: 'border-box',
          textAlign: 'center',
          boxShadow:
            '0 10px 35px rgba(0, 0, 0, 0.35)'
        }}
      >

        {/* LOGO */}

        <Logo />

        {/* =====================
            STATUS PERDIDO
        ===================== */}

        {p.status === 'Perdido' && (
          <div
            className="alert"
            style={{
              marginTop: '20px',
              marginBottom: '20px',
              padding: '14px',
              borderRadius: '14px',
              background: '#3A1111',
              border: '1px solid #6B2020',
              color: '#FF6B6B',
              fontWeight: '700'
            }}
          >
            🚨 PET PERDIDO

            <br />

            <small
              style={{
                display: 'block',
                marginTop: '5px',
                color: '#FFB0B0',
                fontWeight: '400'
              }}
            >
              Este pet está sendo procurado
              pelo tutor.
            </small>
          </div>
        )}

        {/* =====================
            STATUS ENCONTRADO
        ===================== */}

        {p.status === 'Encontrado' && (
          <div
            className="found"
            style={{
              marginTop: '20px',
              marginBottom: '20px',
              padding: '12px',
              borderRadius: '14px',
              background: '#102A18',
              border: '1px solid #245A35',
              color: '#65D98A',
              fontWeight: '700'
            }}
          >
            ✓ Pet encontrado
          </div>
        )}

        {/* =====================
            FOTO
        ===================== */}

        <div
          className="photo public-photo"
          style={{
            width: '150px',
            height: '150px',
            margin: '20px auto',
            borderRadius: '50%',
            overflow: 'hidden',
            background: '#222222',
            border: '3px solid #333333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {p.foto_url ? (
            <img
              src={p.foto_url}
              alt={p.nome}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          ) : (
            <span
              style={{
                fontSize: '48px'
              }}
            >
              🐾
            </span>
          )}
        </div>

        {/* =====================
            NOME DO PET
        ===================== */}

        <h1
          style={{
            margin: '10px 0 5px',
            color: '#B8B8B8',
            fontSize: '30px',
            fontWeight: '700'
          }}
        >
          {p.nome}
        </h1>

        {/* =====================
            RAÇA / SEXO
        ===================== */}

        <p
          style={{
            margin: '0 0 22px',
            color: '#888888',
            fontSize: '15px'
          }}
        >
          {p.raca ||
            'Raça não informada'}{' '}
          · {p.sexo}
        </p>

        {/* =====================
            CARACTERÍSTICAS
        ===================== */}

        {p.caracteristicas && (
          <div
            className="info"
            style={{
              textAlign: 'left',
              background: '#101010',
              border: '1px solid #252525',
              borderRadius: '14px',
              padding: '15px',
              marginBottom: '12px'
            }}
          >
            <b
              style={{
                display: 'block',
                color: '#B8B8B8',
                marginBottom: '6px'
              }}
            >
              Características
            </b>

            <p
              style={{
                margin: 0,
                color: '#888888',
                lineHeight: '1.5'
              }}
            >
              {p.caracteristicas}
            </p>
          </div>
        )}

        {/* =====================
            CIDADE
        ===================== */}

        {p.cidade && (
          <div
            className="info"
            style={{
              textAlign: 'left',
              background: '#101010',
              border: '1px solid #252525',
              borderRadius: '14px',
              padding: '15px',
              marginBottom: '18px'
            }}
          >
            <b
              style={{
                display: 'block',
                color: '#B8B8B8',
                marginBottom: '6px'
              }}
            >
              Cidade
            </b>

            <p
              style={{
                margin: 0,
                color: '#888888'
              }}
            >
              {p.cidade}
            </p>
          </div>
        )}

        {/* =====================
            BOTÕES DE CONTATO
        ===================== */}

        <div
          className="actions"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px'
          }}
        >
          {p.whatsapp && (
            <>
              <a
                className="wa"
                href={
                  'https://wa.me/55' +
                  p.whatsapp.replace(
                    /\D/g,
                    ''
                  )
                }
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '48px',
                  borderRadius: '12px',
                  background: '#25D366',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '15px'
                }}
              >
                💬 WhatsApp
              </a>

              <a
                className="call"
                href={
                  'tel:' +
                  p.whatsapp.replace(
                    /\D/g,
                    ''
                  )
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '48px',
                  borderRadius: '12px',
                  background: '#222222',
                  border: '1px solid #333333',
                  color: '#B8B8B8',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '15px'
                }}
              >
                📞 Ligar
              </a>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

/* =========================
   APP
========================= */

function App() {
  const [session, setSession] =
    useState(null);

  const [ready, setReady] =
    useState(false);

  useEffect(() => {
    if (!S) {
      setReady(true);
      return;
    }

    S.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
        setReady(true);
      });

    const {
      data: {
        subscription
      }
    } = S.auth.onAuthStateChange(
      (_, s) => {
        setSession(s);
      }
    );

    return () =>
      subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <div className="loading">
        Carregando SOSPet...
      </div>
    );
  }

  const guard = x =>
    session
      ? x
      : <Navigate to="/login" />;

  return (
    <Routes>
      {/* =====================
          INÍCIO
      ===================== */}

<Route
  path="/"
  element={
    session ? (
      <Navigate to="/pets" />
    ) : (
      <div
        className="landing"
        style={{
          minHeight: '100vh',
          width: '100%',
          background: '#0B0B0B',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px 20px',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}
      >
        {/* LOGO */}

        <div
          style={{
            marginBottom: '25px'
          }}
        >
          <Logo />
        </div>

        {/* TÍTULO */}

        <h1
          style={{
            margin: '0 0 12px',
            color: '#B8B8B8',
            fontSize: '30px',
            lineHeight: '1.2',
            fontWeight: '700',
            maxWidth: '400px'
          }}
        >
          Tecnologia a favor da vida.
        </h1>

        {/* DESCRIÇÃO */}

        <p
          style={{
            margin: '0 0 30px',
            color: '#777777',
            fontSize: '15px',
            lineHeight: '1.5',
            maxWidth: '360px'
          }}
        >
          Identificação inteligente para
          ajudar seu pet a voltar para casa.
        </p>

        {/* BOTÕES */}

        <div
          style={{
            width: '100%',
            maxWidth: '360px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <Link
            className="primary btn"
            to="/login"
            style={{
              width: '100%',
              minHeight: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              borderRadius: '12px',
              background: '#FFFFFF',
              color: '#0B0B0B',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '700'
            }}
          >
            Entrar
          </Link>

          <Link
            className="secondary btn"
            to="/cadastro"
            style={{
              width: '100%',
              minHeight: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              borderRadius: '12px',
              background: '#151515',
              border: '1px solid #333333',
              color: '#B8B8B8',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '700'
            }}
          >
            Criar conta
          </Link>
        </div>
      </div>
    )
  }
/>

      {/* =====================
          LOGIN
      ===================== */}

      <Route
        path="/login"
        element={
          session ? (
            <Navigate to="/pets" />
          ) : (
            <Login />
          )
        }
      />

      {/* =====================
          CADASTRO
      ===================== */}

      <Route
        path="/cadastro"
        element={
          session ? (
            <Navigate to="/pets" />
          ) : (
            <Register />
          )
        }
      />

      {/* =====================
          CONFIRMAÇÃO DE E-MAIL
      ===================== */}

      <Route
        path="/confirmar-email"
        element={
          session ? (
            <Navigate to="/pets" />
          ) : (
            <ConfirmEmail />
          )
        }
      />

      {/* =====================
          TAG PÚBLICA
      ===================== */}

      <Route
        path="/tag/:code"
        element={<Public />}
      />

      {/* =====================
          MEUS PETS
      ===================== */}

      <Route
        path="/pets"
        element={guard(
          <Shell>
            <Pets />
          </Shell>
        )}
      />

      {/* =====================
          NOVO PET
      ===================== */}

      <Route
        path="/pets/novo"
        element={guard(
          <Shell>
            <NewPet />
          </Shell>
        )}
      />

      {/* =====================
          DETALHE DO PET
      ===================== */}

      <Route
        path="/pets/:id"
        element={guard(
          <Shell>
            <Detail />
          </Shell>
        )}
      />

      {/* =====================
          PERFIL
      ===================== */}

      <Route
        path="/perfil"
        element={guard(
          <Shell>
            <Profile
              onOut={() =>
                S.auth.signOut()
              }
            />
          </Shell>
        )}
      />

      {/* =====================
          ROTA DESCONHECIDA
      ===================== */}

      <Route
        path="*"
        element={
          <Navigate to="/" />
        }
      />
    </Routes>
  );
}

/* =========================
   INICIALIZAÇÃO
========================= */

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);