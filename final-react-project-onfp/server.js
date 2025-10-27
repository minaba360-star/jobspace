import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Configuration CORS
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir les fichiers statiques du dossier uploads
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Configuration de Multer pour l'upload de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fieldName = file.fieldname;
    cb(null, fieldName + '-' + uniqueSuffix + '.pdf');
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Limite de 10MB
});

// Chemin vers le fichier db.json
const dbPath = join(__dirname, 'db.json');

// Fonction pour lire la base de données
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors de la lecture de db.json:', error);
    return { candidats: [], offres: [], recruteurs: [] };
  }
};

// Fonction pour écrire dans la base de données
const writeDB = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans db.json:', error);
    return false;
  }
};

// Routes pour les candidats
app.get('/candidats', (req, res) => {
  const db = readDB();
  res.json(db.candidats || []);
});

app.get('/candidats/:id', (req, res) => {
  const db = readDB();
  const candidat = db.candidats?.find(c => c.id === req.params.id);
  if (candidat) {
    res.json(candidat);
  } else {
    res.status(404).json({ error: 'Candidat non trouvé' });
  }
});

app.post('/candidats', (req, res) => {
  const db = readDB();
  const newCandidat = req.body;
  
  if (!db.candidats) {
    db.candidats = [];
  }
  
  db.candidats.push(newCandidat);
  
  if (writeDB(db)) {
    res.status(201).json(newCandidat);
  } else {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement' });
  }
});

app.patch('/candidats/:id', (req, res) => {
  const db = readDB();
  const index = db.candidats?.findIndex(c => c.id === req.params.id);
  
  if (index !== -1 && index !== undefined) {
    db.candidats[index] = { ...db.candidats[index], ...req.body };
    
    if (writeDB(db)) {
      res.json(db.candidats[index]);
    } else {
      res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
  } else {
    res.status(404).json({ error: 'Candidat non trouvé' });
  }
});

app.delete('/candidats/:id', (req, res) => {
  const db = readDB();
  const index = db.candidats?.findIndex(c => c.id === req.params.id);
  
  if (index !== -1 && index !== undefined) {
    db.candidats.splice(index, 1);
    
    if (writeDB(db)) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
  } else {
    res.status(404).json({ error: 'Candidat non trouvé' });
  }
});

// Routes pour les offres
app.get('/offres', (req, res) => {
  const db = readDB();
  res.json(db.offres || []);
});

app.get('/offres/:id', (req, res) => {
  const db = readDB();
  const offre = db.offres?.find(o => o.id === parseInt(req.params.id));
  if (offre) {
    res.json(offre);
  } else {
    res.status(404).json({ error: 'Offre non trouvée' });
  }
});

app.post('/offres', (req, res) => {
  const db = readDB();
  const newOffre = req.body;
  
  if (!db.offres) {
    db.offres = [];
  }
  
  // Générer un nouvel ID
  const maxId = db.offres.length > 0 ? Math.max(...db.offres.map(o => o.id)) : 0;
  newOffre.id = maxId + 1;
  
  db.offres.push(newOffre);
  
  if (writeDB(db)) {
    res.status(201).json(newOffre);
  } else {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'offre' });
  }
});

app.patch('/offres/:id', (req, res) => {
  const db = readDB();
  const index = db.offres?.findIndex(o => o.id === parseInt(req.params.id));
  
  if (index !== -1 && index !== undefined) {
    db.offres[index] = { ...db.offres[index], ...req.body };
    
    if (writeDB(db)) {
      res.json(db.offres[index]);
    } else {
      res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
  } else {
    res.status(404).json({ error: 'Offre non trouvée' });
  }
});

app.delete('/offres/:id', (req, res) => {
  const db = readDB();
  const index = db.offres?.findIndex(o => o.id === parseInt(req.params.id));
  
  if (index !== -1 && index !== undefined) {
    db.offres.splice(index, 1);
    
    if (writeDB(db)) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
  } else {
    res.status(404).json({ error: 'Offre non trouvée' });
  }
});

// Routes pour les recruteurs
app.get('/recruteurs', (req, res) => {
  const db = readDB();
  res.json(db.recruteurs || []);
});

app.post('/recruteurs', (req, res) => {
  const db = readDB();
  const newRecruteur = req.body;
  
  if (!db.recruteurs) {
    db.recruteurs = [];
  }
  
  db.recruteurs.push(newRecruteur);
  
  if (writeDB(db)) {
    res.status(201).json(newRecruteur);
  } else {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement' });
  }
});

// Route pour l'upload de fichiers
app.post('/upload', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'diplome', maxCount: 1 },
  { name: 'lettre', maxCount: 1 }
]), (req, res) => {
  try {
    const files = req.files;
    const uploadedFiles = {};

    if (files.cv) uploadedFiles.cv = `/uploads/${files.cv[0].filename}`;
    if (files.diplome) uploadedFiles.diplome = `/uploads/${files.diplome[0].filename}`;
    if (files.lettre) uploadedFiles.lettre = `/uploads/${files.lettre[0].filename}`;

    res.json(uploadedFiles);
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    res.status(500).json({ error: 'Erreur lors de l\'upload des fichiers' });
  }
});

// Route de test
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur en cours d\'exécution' });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📁 Base de données: ${dbPath}`);
});
