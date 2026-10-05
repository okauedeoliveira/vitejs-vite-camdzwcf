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
  const params = new URLSearchParams(
    window.location.search
  );
  const tag = params.get('tag');

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
          telefone: phone,
          tag: tag || null
        }
      }
    });

    setLoading(false);

    if (error) {
      setM(error.message);
      return;
    }

    if (data.session) {
      if (tag) {
        nav(
          '/pets/novo?tag=' +
            encodeURIComponent(tag)
        );
      } else {
        nav('/pets');
      }

      return;
    }

    let confirmUrl =
      '/confirmar-email?email=' +
      encodeURIComponent(email);

    if (tag) {
      confirmUrl +=
        '&tag=' +
        encodeURIComponent(tag);
    }

    nav(confirmUrl);
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

        <h1
          style={{
            margin: '0 0 8px',
            textAlign: 'center',
            color: '#B8B8B8',
            fontSize: '28px',
            fontWeight: '700'
          }}
        >
          Criar conta
        </h1>

        <p
          style={{
            margin: '0 0 26px',
            textAlign: 'center',
            color: '#777777',
            fontSize: '14px'
          }}
        >
          Comece a proteger seus pets.
        </p>

        <form
          onSubmit={go}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >

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
            Nome completo

            <input
              required
              value={name}
              onChange={e => setN(e.target.value)}
              placeholder="Seu nome"
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
            WhatsApp / Telefone

            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="(13) 99999-9999"
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
              placeholder="seu@email.com"
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
              minLength="6"
              required
              value={pass}
              onChange={e => setP(e.target.value)}
              placeholder="Mínimo de 6 caracteres"
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

          {msg && (
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
              {msg}
            </div>
          )}

          <button
            type="submit"
            className="primary"
            disabled={loading}
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
              cursor: loading
                ? 'not-allowed'
                : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading
              ? 'Criando conta...'
              : 'Criar conta'}
          </button>

        </form>

        <div
          style={{
            marginTop: '24px',
            textAlign: 'center',
            color: '#777777',
            fontSize: '13px'
          }}
        >
          Já possui conta?{' '}

          <Link
            to="/login"
            style={{
              color: '#B8B8B8',
              fontWeight: '700',
              textDecoration: 'none'
            }}
          >
            Entrar
          </Link>
        </div>

      </div>
    </div>
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
  const tag = params.get('tag') || '';

  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [token, setToken] = useState('');

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

    if (!token.trim()) {
      setErr('Digite o código recebido por e-mail.');
      return;
    }

    setLoading(true);

    const { data, error } = await S.auth.verifyOtp({
      email,
      token: token.trim(),
      type: 'email'
    });

    if (error) {
      console.error(error);
      setErr(
        error.message ||
          'Código inválido ou expirado.'
      );
      setLoading(false);
      return;
    }

    if (data?.user) {
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

    if (tag) {
      nav(
        '/pets/novo?tag=' +
          encodeURIComponent(tag)
      );
    } else {
      nav('/pets');
    }
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
      console.error(error);
      setErr(error.message);
      return;
    }

    setMsg('Novo código enviado.');
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
          textAlign: 'center',
          boxShadow:
            '0 10px 35px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px'
          }}
        >
          <Logo />
        </div>

        <h1
          style={{
            margin: '0 0 10px',
            color: '#B8B8B8',
            fontSize: '28px',
            fontWeight: '700'
          }}
        >
          Confirme seu e-mail
        </h1>

        <p
          style={{
            margin: '0 0 8px',
            color: '#777777',
            fontSize: '14px'
          }}
        >
          Digite o código enviado para:
        </p>

        <strong
          style={{
            display: 'block',
            color: '#FFFFFF',
            fontSize: '14px',
            wordBreak: 'break-word'
          }}
        >
          {email}
        </strong>

        <form onSubmit={verify}>
          <input
            type="text"
            inputMode="numeric"
            value={token}
            onChange={e =>
              setToken(
                e.target.value
                  .replace(/\D/g, '')
                  .slice(0, 6)
              )
            }
            placeholder="Código de confirmação"
            style={{
              width: '100%',
              height: '52px',
              marginTop: '28px',
              padding: '0 14px',
              boxSizing: 'border-box',
              borderRadius: '12px',
              border: '1px solid #333333',
              background: '#0B0B0B',
              color: '#FFFFFF',
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: '700',
              outline: 'none'
            }}
          />

          {err && (
            <div
              style={{
                padding: '12px',
                marginTop: '12px',
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

          {msg && (
            <div
              style={{
                padding: '10px',
                marginTop: '12px',
                color: '#65D98A',
                fontSize: '13px'
              }}
            >
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              height: '50px',
              marginTop: '15px',
              border: 'none',
              borderRadius: '12px',
              background: '#FFFFFF',
              color: '#0B0B0B',
              fontSize: '15px',
              fontWeight: '700',
              cursor: loading
                ? 'not-allowed'
                : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading
              ? 'Confirmando...'
              : 'Confirmar e-mail'}
          </button>
        </form>

        <button
          type="button"
          onClick={resend}
          disabled={resending}
          style={{
            marginTop: '20px',
            padding: '8px',
            background: 'none',
            border: 'none',
            color: '#B8B8B8',
            fontSize: '13px',
            cursor: resending
              ? 'not-allowed'
              : 'pointer',
            opacity: resending ? 0.6 : 1
          }}
        >
          {resending
            ? 'Enviando...'
            : 'Reenviar código'}
        </button>

        <div
          style={{
            marginTop: '18px',
            color: '#777777',
            fontSize: '12px'
          }}
        >
          E-mail incorreto?{' '}
          <Link
            to="/cadastro"
            style={{
              color: '#B8B8B8',
              fontWeight: '700'
            }}
          >
            Voltar ao cadastro
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================
   SHELL
========================= */

function Shell({ children }) {
  useEffect(() => {
    const main = document.querySelector('.app-main');
    const menu = document.querySelector('.bottom-nav-wrapper');

    if (!main || !menu) return;

    function updateMenuPosition() {
      const rect = main.getBoundingClientRect();

      const contentWidth = Math.max(
        main.scrollWidth,
        main.clientWidth
      );

      const center =
        rect.left +
        contentWidth / 2 -
        main.scrollLeft;

      menu.style.left = `${center}px`;
      menu.style.transform = 'translateX(-50%)';
    }

    updateMenuPosition();

    main.addEventListener(
      'scroll',
      updateMenuPosition,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      updateMenuPosition
    );

    return () => {
      main.removeEventListener(
        'scroll',
        updateMenuPosition
      );

      window.removeEventListener(
        'resize',
        updateMenuPosition
      );
    };
  }, []);

  return (
    <div
      className="app-shell"
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#0B0B0B',
        color: '#FFFFFF',
        position: 'relative'
      }}
    >
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
          color: '#FFFFFF',
          width: '100%',
          overflowX: 'auto',
          overflowY: 'visible'
        }}
      >
        {children}
      </main>

      <div
        className="bottom-nav-wrapper"
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          width: '360px',
          minWidth: '320px',
          height: '55px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }}
      >
        <nav
          className="bottom-nav"
          style={{
            width: '360px',
            minWidth: '320px',
            height: '55px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px 8px',
            margin: '0',
            background: '#151515',
            border: '1px solid #2A2A2A',
            borderRadius: '18px',
            boxShadow:
              '0 8px 25px rgba(0, 0, 0, 0.45)',
            boxSizing: 'border-box',
            pointerEvents: 'auto',
            flexShrink: 0
          }}
        >
          <Link
            to="/pets"
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              fontSize: '11px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              flex: '1 1 0',
              minWidth: '0',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '20px' }}>
              🐾
            </span>
            <span>Meus Pets</span>
          </Link>

          <Link
            to="/pets/novo"
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              fontSize: '11px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              flex: '1 1 0',
              minWidth: '0',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '20px' }}>
              ➕
            </span>
            <span>Cadastrar Pet</span>
          </Link>

          <Link
            to="/perfil"
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              fontSize: '11px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              flex: '1 1 0',
              minWidth: '0',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '20px' }}>
              👤
            </span>
            <span>Perfil</span>
          </Link>
        </nav>
      </div>
    </div>
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
    <div
      className="container"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#0B0B0B',
        color: '#FFFFFF',
        padding: '30px 0 120px',
        boxSizing: 'border-box'
      }}
    >

      <div
        style={{
          width: 'max(100%, 948px)',
          minWidth: '948px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >

        {/* CABEÇALHO */}

        <div
          className="head"
          style={{
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <small
              style={{
                color: '#777777',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '1px'
              }}
            >
              ÁREA DO TUTOR
            </small>

            <h1
              style={{
                margin: '6px 0 0',
                color: '#B8B8B8',
                fontSize: '30px',
                fontWeight: '700'
              }}
            >
              Meus Pets
            </h1>
          </div>

          <Link
            className="primary btn"
            to="/pets/novo"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '46px',
              padding: '0 18px',
              background: '#FFFFFF',
              color: '#0B0B0B',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '700',
              boxSizing: 'border-box'
            }}
          >
            + Cadastrar pet
          </Link>
        </div>

        {/* CARREGANDO */}

        {loading ? (

          <div
            style={{
              width: '100%',
              maxWidth: '900px',
              margin: '0 auto',
              color: '#777777',
              textAlign: 'center',
              padding: '40px 0'
            }}
          >
            Carregando...
          </div>

        ) : pets.length ? (

          /* LISTA DE PETS */

          <div
            className="grid"
            style={{
              width: '900px',
              minWidth: '900px',
              maxWidth: '900px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              boxSizing: 'border-box'
            }}
          >
            {pets.map(p => (

              <Link
                className="pet"
                key={p.id}
                to={'/pets/' + p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  width: '100%',
                  padding: '16px',
                  boxSizing: 'border-box',
                  background: '#151515',
                  border: '1px solid #2A2A2A',
                  borderRadius: '18px',
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  transition: 'border-color 0.2s ease'
                }}
              >

                {/* FOTO */}

                <div
                  className="photo"
                  style={{
                    width: '82px',
                    height: '82px',
                    minWidth: '82px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#222222',
                    border: '1px solid #333333',
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
                        fontSize: '32px'
                      }}
                    >
                      🐾
                    </span>
                  )}
                </div>

                {/* INFORMAÇÕES */}

                <div
                  style={{
                    minWidth: 0,
                    flex: 1
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 5px',
                      color: '#B8B8B8',
                      fontSize: '20px',
                      fontWeight: '700',
                      lineHeight: '1.2'
                    }}
                  >
                    {p.nome}
                  </h3>

                  <p
                    style={{
                      margin: '0 0 9px',
                      color: '#777777',
                      fontSize: '13px',
                      lineHeight: '1.4'
                    }}
                  >
                    {p.raca ||
                      'Raça não informada'}{' '}
                    · {p.sexo || ''}
                  </p>

                  <b
                    className={
                      p.status === 'Perdido'
                        ? 'lost'
                        : p.status === 'Encontrado'
                        ? 'found'
                        : ''
                    }
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '5px 9px',
                      borderRadius: '8px',
                      background:
                        p.status === 'Perdido'
                          ? '#3A1111'
                          : p.status === 'Encontrado'
                          ? '#102A18'
                          : '#222222',
                      border:
                        p.status === 'Perdido'
                          ? '1px solid #6B2020'
                          : p.status === 'Encontrado'
                          ? '1px solid #245A35'
                          : '1px solid #333333',
                      color:
                        p.status === 'Perdido'
                          ? '#FF7777'
                          : p.status === 'Encontrado'
                          ? '#65D98A'
                          : '#999999',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}
                  >
                    {p.status}
                  </b>
                </div>

              </Link>

            ))}
          </div>

        ) : (

          /* NENHUM PET */

          <div
            className="empty"
            style={{
              width: '100%',
              maxWidth: '500px',
              margin: '60px auto',
              padding: '30px 20px',
              boxSizing: 'border-box',
              background: '#151515',
              border: '1px solid #2A2A2A',
              borderRadius: '20px',
              textAlign: 'center'
            }}
          >
            <h2
              style={{
                margin: '0 0 10px',
                color: '#B8B8B8',
                fontSize: '22px'
              }}
            >
              Nenhum pet cadastrado
            </h2>

            <p
              style={{
                margin: '0 0 22px',
                color: '#777777',
                fontSize: '14px'
              }}
            >
              Cadastre seu primeiro pet.
            </p>

            <Link
              className="primary btn"
              to="/pets/novo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '46px',
                padding: '0 20px',
                background: '#FFFFFF',
                color: '#0B0B0B',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '700'
              }}
            >
              Cadastrar pet
            </Link>
          </div>

        )}

      </div>

    </div>
  );
}

/* =========================
   CADASTRAR PET
========================= */

function NewPet() {
  const nav = useNavigate();

  const params = new URLSearchParams(
    window.location.search
  );

  const tagFromUrl = params.get('tag') || '';

  const [f, setF] = useState({
    nome: '',
    raca: '',
    sexo: 'Macho',
    caracteristicas: '',
    whatsapp: '',
    cidade: '',
    status: 'Normal',
    tag: tagFromUrl
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
      const codigo = f.tag.trim();

      const { data, error } = await S
        .from('tags')
        .select('id,ativa')
        .eq('codigo', codigo)
        .maybeSingle();

      if (error) {
        return setErr(error.message);
      }

      if (data) {
        if (data.ativa) {
          return setErr(
            'Esta tag já está ativa.'
          );
        }

        tag_id = data.id;
      } else {
        const {
          data: novaTag,
          error: tagError
        } = await S
          .from('tags')
          .insert({
            codigo,
            ativa: false
          })
          .select('id')
          .single();

        if (tagError || !novaTag) {
          return setErr(
            tagError?.message ||
            'Não foi possível cadastrar esta tag.'
          );
        }

        tag_id = novaTag.id;
      }
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

    const { data: pet, error } = await S
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
      })
      .select('id')
      .single();

    if (error) {
      setErr(error.message);
      return;
    }

    if (tag_id) {
      const { error: tagError } = await S
        .from('tags')
        .update({
          ativa: true
        })
        .eq('id', tag_id);

      if (tagError) {
        await S
          .from('pets')
          .delete()
          .eq('id', pet.id);

        setErr(tagError.message);
        return;
      }
    }

    nav('/pets');
  }

  return (
    <div
      className="container narrow"
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '48px 0 24px',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          width: 'max(100%, 648px)',
          minWidth: '648px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            width: '600px',
            minWidth: '600px',
            maxWidth: '600px'
          }}
        >
          <Link to="/pets">
            ← Voltar
          </Link>

          <h1>
            Cadastrar Pet
          </h1>

          <form
            className="form"
            onSubmit={go}
            style={{
              width: '600px',
              minWidth: '600px',
              maxWidth: '600px',
              margin: '0',
              boxSizing: 'border-box'
            }}
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
                    set('cidade', e.target.value)
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
                </select>
              </label>

              <label>
                Tag
                <input
                  placeholder="RF-00001"
                  value={f.tag}
                  readOnly={!!tagFromUrl}
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
                capture="environment"
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
      </div>
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
          status: f.status
        })
        .eq('id', pet.id)
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      onSaved({
        ...data,
        tag_codigo:
          pet.tag_codigo || ''
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
          </select>
        </label>

        <label>
          Tag
          <input
            placeholder="RF-00001"
            value={f.tag}
            readOnly
          />
        </label>

        <label>
          Nova foto
          <input
            type="file"
            accept="image/*"
            capture="environment"
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
  const [editingStatus, setEditingStatus] =
    useState(false);
  const [savingStatus, setSavingStatus] =
    useState(false);

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

  async function changeStatus(status) {
    if (!p || savingStatus) return;

    setSavingStatus(true);
    setErr('');

    const {
      data,
      error
    } = await S
      .from('pets')
      .update({
        status
      })
      .eq('id', p.id)
      .select()
      .single();

    if (error) {
      setErr(error.message);
    } else {
      setP(prev => ({
        ...prev,
        ...data
      }));

      setEditingStatus(false);
    }

    setSavingStatus(false);
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

  if (err && !p) {
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

        <div
          style={{
            position: 'relative',
            display: 'inline-block'
          }}
        >
          <b
            onClick={() =>
              setEditingStatus(!editingStatus)
            }
            style={{
              display: 'inline-block',
              cursor: 'pointer',
              background: '#FFFFFF',
              color:
                p.status === 'Perdido'
                  ? '#C22'
                  : '#18703C',
              padding: '6px 9px',
              borderRadius: '99px',
              fontSize: '11px',
              fontWeight: '700',
              border: '1px solid #E5E5E5'
            }}
            title="Clique para alterar o status"
          >
            {p.status === 'Perdido'
              ? 'Perdido'
              : 'Normal'}
          </b>

          {editingStatus && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 5px)',
                left: '0',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                minWidth: '90px',
                padding: '5px',
                background: '#151515',
                border: '1px solid #2A2A2A',
                borderRadius: '10px',
                boxShadow:
                  '0 8px 20px rgba(0, 0, 0, 0.45)'
              }}
            >
              <button
                type="button"
                disabled={savingStatus}
                onClick={() =>
                  changeStatus('Normal')
                }
                style={{
                  width: '100%',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '7px 10px',
                  borderRadius: '7px',
                  fontSize: '11px',
                  fontWeight: '700',
                  background: '#FFFFFF',
                  color: '#18703C',
                  textAlign: 'left'
                }}
              >
                Normal
              </button>

              <button
                type="button"
                disabled={savingStatus}
                onClick={() =>
                  changeStatus('Perdido')
                }
                style={{
                  width: '100%',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '7px 10px',
                  borderRadius: '7px',
                  fontSize: '11px',
                  fontWeight: '700',
                  background: '#FFFFFF',
                  color: '#C22',
                  textAlign: 'left'
                }}
              >
                Perdido
              </button>
            </div>
          )}
        </div>

        {err && (
          <div
            className="err"
            style={{
              marginTop: '15px'
            }}
          >
            {err}
          </div>
        )}

        {p.caracteristicas && (
          <div className="info">
            <b>Observações</b>
            <p>{p.caracteristicas}</p>
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

  const [editing, setEditing] =
    useState(false);

  const [changed, setChanged] =
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

  function updateField(
    field,
    value
  ) {
    setP(prev => ({
      ...prev,
      [field]: value
    }));

    setChanged(true);
    setSaved(false);
  }

  function startEditing() {
    setEditing(true);
    setChanged(false);
    setSaved(false);
  }

  async function save(e) {
    e.preventDefault();

    if (!changed) return;

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
      setChanged(false);
      setEditing(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  }

  if (loading) {
    return (
      <div
        className="container"
        style={{
          width: '800px',
          minWidth: '800px',
          maxWidth: 'none',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}
      >
        Carregando perfil...
      </div>
    );
  }

  return (
    <div
      className="profile-page"
      style={{
        width: '800px',
        minWidth: '800px',
        maxWidth: 'none',
        margin: '0 auto',
        padding: '48px 0 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        className="profile-header"
        style={{
          width: '600px',
          minWidth: '600px',
          maxWidth: 'none'
        }}
      >
        <div>
          <h1>Meu perfil</h1>

          <p>
            Gerencie seus dados pessoais.
          </p>
        </div>
      </div>

      <div
        className="profile-card"
        style={{
          width: '600px',
          minWidth: '600px',
          maxWidth: 'none',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <div className="profile-section-title">
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
          style={{
            width: '600px',
            minWidth: '600px',
            maxWidth: 'none',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxSizing: 'border-box'
          }}
        >
          <label>
            Nome completo

            <input
              required
              value={p.nome}
              disabled={!editing}
              onChange={e =>
                updateField(
                  'nome',
                  e.target.value
                )
              }
            />
          </label>

          <label>
            WhatsApp / Telefone

            <input
              type="tel"
              required
              value={p.telefone}
              disabled={!editing}
              onChange={e =>
                updateField(
                  'telefone',
                  e.target.value
                )
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
              pode ser alterado.
            </small>
          </label>

          {saved && (
            <div className="success-message">
              ✓ Dados salvos com sucesso.
            </div>
          )}

          {!editing && (
            <button
              type="button"
              className="primary"
              onClick={startEditing}
            >
              Editar informações
            </button>
          )}

          {editing && changed && (
            <button
              type="submit"
              className="primary"
              disabled={saving}
            >
              {saving
                ? 'Salvando...'
                : 'Salvar alterações'}
            </button>
          )}
        </form>
      </div>

      <button
        type="button"
        className="secondary btn"
        onClick={onOut}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
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
  const navigate = useNavigate();
  
  if (!code) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0B0B0B',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}
      >
        PARAM CODE VAZIO
      </div>
    );
  }

  const [p, setP] = useState();
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      const {
        data: tag,
        error: tagError
      } = await S
        .from('tags')
        .select('id,codigo,ativa')
        .eq('codigo', code.trim())
        .maybeSingle();

      if (tagError) {
        console.error(tagError);

        return setErr(
          'Erro ao consultar a tag.'
        );
      }

      if (!tag) {
        return setErr(
          'Tag não encontrada.'
        );
      }

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
        if (!tag.ativa) {
          navigate(
            '/cadastro?tag=' +
              encodeURIComponent(tag.codigo),
            {
              replace: true
            }
          );

          return;
        }

        return setErr(
          'Nenhum pet associado a esta tag.'
        );
      }

      setP(pet);
    })();
  }, [code, navigate]);

  if (err) {
    return (
      <div
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
          style={{
            width: '100%',
            maxWidth: '420px',
            background: '#151515',
            border: '1px solid #2A2A2A',
            borderRadius: '20px',
            padding: '28px 22px',
            boxSizing: 'border-box',
            textAlign: 'center',
            color: '#FFFFFF',
            boxShadow:
              '0 10px 35px rgba(0, 0, 0, 0.35)'
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

  if (!p) {
    return (
      <div
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

  return (
    <div
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
        <Logo />

        {p.status === 'Perdido' && (
          <div
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

        <div
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

        {p.caracteristicas && (
          <div
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

        {p.cidade && (
          <div
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

        {p.whatsapp && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginTop: '20px'
            }}
          >
            <a
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
          </div>
        )}
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