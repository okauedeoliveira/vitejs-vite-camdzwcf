import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
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
  <Link className="logo" to="/">
    <b>🐾</b>
    <span>
      SOS<span>Pet</span>
    </span>
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
    <AuthLayout>
      <div className="card">
        <Logo />

        <h1>Entrar</h1>

        <p>Acesse sua conta SOSPet.</p>

        <form onSubmit={go}>
          <label>
            E-mail
            <input
              type="email"
              required
              value={email}
              onChange={e => setE(e.target.value)}
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              required
              value={pass}
              onChange={e => setP(e.target.value)}
            />
          </label>

          {err && <div className="err">{err}</div>}

          <button className="primary">
            {load ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <small>
          Não tem conta? <Link to="/cadastro">Criar conta</Link>
        </small>
      </div>
    </AuthLayout>
  );
}

/* =========================
   CADASTRO
========================= */

function Register() {
  const nav = useNavigate();

  const [name, setN] = useState('');
  const [email, setE] = useState('');
  const [pass, setP] = useState('');
  const [msg, setM] = useState('');

  async function go(e) {
    e.preventDefault();

    setM('');

    if (!S) {
      return setM('Configure o Supabase primeiro.');
    }

    const { data, error } = await S.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          nome: name
        }
      }
    });

    if (error) {
      setM(error.message);
    } else if (data.session) {
      nav('/pets');
    } else {
      setM(
        'Conta criada. Verifique seu e-mail se a confirmação estiver ativada.'
      );
    }
  }

  return (
    <AuthLayout>
      <div className="card">
        <Logo />

        <h1>Criar conta</h1>

        <p>Comece a proteger seus pets.</p>

        <form onSubmit={go}>
          <label>
            Nome
            <input
              required
              value={name}
              onChange={e => setN(e.target.value)}
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              required
              value={email}
              onChange={e => setE(e.target.value)}
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
            />
          </label>

          {msg && <div className="err">{msg}</div>}

          <button className="primary">Criar conta</button>
        </form>

        <small>
          Já possui conta? <Link to="/login">Entrar</Link>
        </small>
      </div>
    </AuthLayout>
  );
}

/* =========================
   SHELL
========================= */

function Shell({ children, onOut }) {
  return (
    <>
      <header>
        <Logo />

        <nav>
          <Link to="/pets">Meus Pets</Link>
          <Link to="/pets/novo">Cadastrar Pet</Link>
          <Link to="/perfil">Perfil</Link>

          <button onClick={onOut}>Sair</button>
        </nav>
      </header>

      <main>{children}</main>

      <footer>SOSPet · Tecnologia a favor da vida</footer>
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
      .order('created_at', { ascending: false });

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

        <Link className="primary btn" to="/pets/novo">
          + Cadastrar pet
        </Link>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : pets.length ? (
        <div className="grid">
          {pets.map(p => (
            <Link className="pet" key={p.id} to={'/pets/' + p.id}>
              <div className="photo">
                {p.foto_url ? (
                  <img src={p.foto_url} alt={p.nome} />
                ) : (
                  <span>🐾</span>
                )}
              </div>

              <div>
                <h3>{p.nome}</h3>

                <p>
                  {p.raca || 'Raça não informada'} · {p.sexo || ''}
                </p>

                <b
                  className={
                    p.status === 'Perdido'
                      ? 'lost'
                      : p.status === 'Encontrado'
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

          <p>Cadastre seu primeiro pet.</p>

          <Link className="primary btn" to="/pets/novo">
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
        return setErr('Tag não encontrada.');
      }

      tag_id = data.id;
    }

    let foto_url = null;

    if (file) {
      const ext = file.name.split('.').pop() || 'jpg';

      const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

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
        .getPublicUrl(path).data.publicUrl;
    }

    const { error } = await S.from('pets').insert({
      tutor_id: user.id,
      tag_id,
      nome: f.nome,
      foto_url,
      raca: f.raca || null,
      sexo: f.sexo,
      caracteristicas: f.caracteristicas || null,
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
      <Link to="/pets">← Voltar</Link>

      <h1>Cadastrar Pet</h1>

      <form className="form" onSubmit={go}>
        <label>
          Nome *
          <input
            required
            value={f.nome}
            onChange={e => set('nome', e.target.value)}
          />
        </label>

        <div className="row">
          <label>
            Raça
            <input
              value={f.raca}
              onChange={e => set('raca', e.target.value)}
            />
          </label>

          <label>
            Sexo
            <select
              value={f.sexo}
              onChange={e => set('sexo', e.target.value)}
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
            onChange={e => set('caracteristicas', e.target.value)}
          />
        </label>

        <div className="row">
          <label>
            WhatsApp
            <input
              value={f.whatsapp}
              onChange={e => set('whatsapp', e.target.value)}
            />
          </label>

          <label>
            Cidade
            <input
              value={f.cidade}
              onChange={e => set('cidade', e.target.value)}
            />
          </label>
        </div>

        <div className="row">
          <label>
            Status
            <select
              value={f.status}
              onChange={e => set('status', e.target.value)}
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
              onChange={e => set('tag', e.target.value)}
            />
          </label>
        </div>

        <label>
          Foto
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files?.[0])}
          />
        </label>

        {err && <div className="err">{err}</div>}

        <button className="primary">Salvar pet</button>
      </form>
    </div>
  );
}

/* =========================
   EDITAR PET
========================= */

function EditPet({ pet, onCancel, onSaved }) {
  const [f, setF] = useState({
    nome: pet.nome || '',
    raca: pet.raca || '',
    sexo: pet.sexo || 'Macho',
    caracteristicas: pet.caracteristicas || '',
    whatsapp: pet.whatsapp || '',
    cidade: pet.cidade || '',
    status: pet.status || 'Normal',
    tag: pet.tag_codigo || ''
  });

  const [file, setFile] = useState();
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

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
      let foto_url = pet.foto_url || null;

      /*
        Se uma nova foto foi escolhida,
        fazemos o upload para a pasta do tutor.
      */

      if (file) {
        const {
          data: { user }
        } = await S.auth.getUser();

        const ext = file.name.split('.').pop() || 'jpg';

        const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

        const { error: uploadError } = await S.storage
          .from('pet-fotos')
          .upload(path, file, {
            contentType: file.type
          });

        if (uploadError) {
          throw uploadError;
        }

        foto_url = S.storage
          .from('pet-fotos')
          .getPublicUrl(path).data.publicUrl;
      }

      /*
        Procuramos a tag pelo código.
      */

      let tag_id = null;

      if (f.tag.trim()) {
        const { data: tagData, error: tagError } = await S
          .from('tags')
          .select('id')
          .eq('codigo', f.tag.trim())
          .eq('ativa', true)
          .maybeSingle();

        if (tagError) {
          throw tagError;
        }

        if (!tagData) {
          throw new Error('Tag não encontrada.');
        }

        tag_id = tagData.id;
      }

      /*
        Atualiza o pet.
      */

      const { data, error } = await S
        .from('pets')
        .update({
          nome: f.nome,
          foto_url,
          raca: f.raca || null,
          sexo: f.sexo,
          caracteristicas: f.caracteristicas || null,
          whatsapp: f.whatsapp || null,
          cidade: f.cidade || null,
          status: f.status,
          tag_id
        })
        .eq('id', pet.id)
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      onSaved(data);
    } catch (error) {
      setErr(error.message || 'Não foi possível salvar as alterações.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="edit-box">
      <h2>Editar pet</h2>

      <form className="form" onSubmit={save}>
        <label>
          Nome *
          <input
            required
            value={f.nome}
            onChange={e => set('nome', e.target.value)}
          />
        </label>

        <div className="row">
          <label>
            Raça
            <input
              value={f.raca}
              onChange={e => set('raca', e.target.value)}
            />
          </label>

          <label>
            Sexo
            <select
              value={f.sexo}
              onChange={e => set('sexo', e.target.value)}
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
            onChange={e => set('caracteristicas', e.target.value)}
          />
        </label>

        <div className="row">
          <label>
            WhatsApp
            <input
              value={f.whatsapp}
              onChange={e => set('whatsapp', e.target.value)}
            />
          </label>

          <label>
            Cidade
            <input
              value={f.cidade}
              onChange={e => set('cidade', e.target.value)}
            />
          </label>
        </div>

        <label>
          Status
          <select
            value={f.status}
            onChange={e => set('status', e.target.value)}
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
            onChange={e => set('tag', e.target.value)}
          />
        </label>

        <label>
          Nova foto
          <input
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files?.[0])}
          />
        </label>

        {err && <div className="err">{err}</div>}

        <div className="edit-actions">
          <button
            type="button"
            className="secondary btn"
            onClick={onCancel}
            disabled={saving}
          >
            Cancelar
          </button>

          <button className="primary" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar alterações'}
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
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [err, setErr] = useState('');

  async function loadPet() {
    setLoading(true);
    setErr('');

    /*
      Buscamos também o código da tag
      para permitir editar a tag.
    */

    const { data, error } = await S
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
        tag_codigo: data.tags?.codigo || ''
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
        <Link to="/pets">← Voltar</Link>

        <div className="err">{err}</div>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="container">
        <Link to="/pets">← Voltar</Link>

        <p>Pet não encontrado.</p>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="container narrow">
        <Link to="/pets">← Voltar</Link>

        <EditPet
          pet={p}
          onCancel={() => setEditing(false)}
          onSaved={updated => {
            setP({
              ...updated,
              tag_codigo: p.tag_codigo
            });

            setEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="container narrow">
      <Link to="/pets">← Voltar</Link>

      <div className="detail">
        <div className="photo big">
          {p.foto_url ? (
            <img src={p.foto_url} alt={p.nome} />
          ) : (
            <span>🐾</span>
          )}
        </div>

        <h1>{p.nome}</h1>

        <p>
          {p.raca || 'Raça não informada'} · {p.sexo}
        </p>

        <b
          className={
            p.status === 'Perdido'
              ? 'lost'
              : p.status === 'Encontrado'
              ? 'found'
              : ''
          }
        >
          {p.status}
        </b>

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
            onClick={() => setEditing(true)}
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

function Profile() {
  const [p, setP] = useState({
    nome: '',
    telefone: ''
  });

  useEffect(() => {
    S.from('profiles')
      .select('nome,telefone')
      .single()
      .then(({ data }) => {
        if (data) {
          setP(data);
        }
      });
  }, []);

  async function save(e) {
    e.preventDefault();

    const {
      data: { user }
    } = await S.auth.getUser();

    await S
      .from('profiles')
      .update(p)
      .eq('id', user.id);
  }

  return (
    <div className="container narrow">
      <h1>Perfil</h1>

      <form className="form" onSubmit={save}>
        <label>
          Nome
          <input
            value={p.nome}
            onChange={e =>
              setP({
                ...p,
                nome: e.target.value
              })
            }
          />
        </label>

        <label>
          Telefone
          <input
            value={p.telefone || ''}
            onChange={e =>
              setP({
                ...p,
                telefone: e.target.value
              })
            }
          />
        </label>

        <button className="primary">Salvar</button>
      </form>
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
      const { data, error } = await S.rpc(
        'get_public_pet_by_tag',
        {
          tag_code: code
        }
      );

      if (error) {
        console.error(error);
        return setErr('Erro ao consultar a tag.');
      }

      const pet = data?.[0];

      if (!pet) {
        return setErr('Nenhum pet associado a esta tag.');
      }

      setP(pet);
    })();
  }, [code]);

  if (err) {
    return (
      <div className="public">
        <div className="public-card">
          <Logo />

          <h1>Ops!</h1>

          <p>{err}</p>
        </div>
      </div>
    );
  }

  if (!p) {
    return <div className="public">Carregando...</div>;
  }

  return (
    <div
      className={
        'public ' + (p.status === 'Perdido' ? 'lost-bg' : '')
      }
    >
      <div className="public-card">
        <Logo />

        {p.status === 'Perdido' && (
          <div className="alert">
            🚨 PET PERDIDO
            <br />

            <small>
              Este pet está sendo procurado pelo tutor.
            </small>
          </div>
        )}

        {p.status === 'Encontrado' && (
          <div className="found">
            ✓ Pet encontrado
          </div>
        )}

        <div className="photo public-photo">
          {p.foto_url ? (
            <img src={p.foto_url} alt={p.nome} />
          ) : (
            <span>🐾</span>
          )}
        </div>

        <h1>{p.nome}</h1>

        <p>
          {p.raca || 'Raça não informada'} · {p.sexo}
        </p>

        {p.caracteristicas && (
          <div className="info">
            <b>Características</b>

            <p>{p.caracteristicas}</p>
          </div>
        )}

        {p.cidade && (
          <div className="info">
            <b>Cidade</b>

            <p>{p.cidade}</p>
          </div>
        )}

        <div className="actions">
          {p.whatsapp && (
            <>
              <a
                className="wa"
                href={
                  'https://wa.me/55' +
                  p.whatsapp.replace(/\D/g, '')
                }
                target="_blank"
                rel="noreferrer"
              >
                💬 WhatsApp
              </a>

              <a
                className="call"
                href={
                  'tel:' +
                  p.whatsapp.replace(/\D/g, '')
                }
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
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!S) {
      setReady(true);
      return;
    }

    S.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });

    const {
      data: { subscription }
    } = S.auth.onAuthStateChange((_, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <div className="loading">
        Carregando SOSPet...
      </div>
    );
  }

  const guard = x =>
    session ? x : <Navigate to="/login" />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          session ? (
            <Navigate to="/pets" />
          ) : (
            <div className="landing">
              <Logo />

              <h1>Tecnologia a favor da vida.</h1>

              <p>
                Identificação inteligente para ajudar seu pet
                a voltar para casa.
              </p>

              <Link className="primary btn" to="/login">
                Entrar
              </Link>

              <Link className="secondary btn" to="/cadastro">
                Criar conta
              </Link>
            </div>
          )
        }
      />

      <Route
        path="/login"
        element={
          session ? <Navigate to="/pets" /> : <Login />
        }
      />

      <Route
        path="/cadastro"
        element={
          session ? <Navigate to="/pets" /> : <Register />
        }
      />

      <Route
        path="/tag/:code"
        element={<Public />}
      />

      <Route
        path="/pets"
        element={guard(
          <Shell onOut={() => S.auth.signOut()}>
            <Pets />
          </Shell>
        )}
      />

      <Route
        path="/pets/novo"
        element={guard(
          <Shell onOut={() => S.auth.signOut()}>
            <NewPet />
          </Shell>
        )}
      />

      <Route
        path="/pets/:id"
        element={guard(
          <Shell onOut={() => S.auth.signOut()}>
            <Detail />
          </Shell>
        )}
      />

      <Route
        path="/perfil"
        element={guard(
          <Shell onOut={() => S.auth.signOut()}>
            <Profile />
          </Shell>
        )}
      />

      <Route
        path="*"
        element={<Navigate to="/" />}
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