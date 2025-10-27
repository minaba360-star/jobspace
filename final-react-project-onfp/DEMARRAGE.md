# 🚀 Guide de démarrage - JobSpace

## ✅ Problèmes résolus

1. **Erreur JSON corrigée** : Suppression de la ligne vide dans `db.json`
2. **Serveur backend créé** : Nouveau fichier `server.js` avec toutes les routes API
3. **Configuration API centralisée** : Fichier `src/config/api.ts` pour gérer les URLs
4. **Tous les composants mis à jour** : Utilisation du bon port (3001 au lieu de 3000)

## 📋 Prérequis

- Node.js installé
- npm installé

## 🎯 Démarrage du projet

### Étape 1 : Démarrer le serveur backend (API)

Ouvrez un premier terminal dans le dossier du projet et exécutez :

```bash
npm run server
```

✅ Le serveur backend démarrera sur **http://localhost:3001**

Vous devriez voir :
```
🚀 Serveur démarré sur http://localhost:3001
📁 Base de données: C:\Users\Seydi\OneDrive\Desktop\final-react-project-onfp\db.json
```

### Étape 2 : Démarrer l'application React (Frontend)

Ouvrez un **SECOND terminal** (laissez le premier ouvert) et exécutez :

```bash
npm run dev
```

✅ L'application React démarrera sur **http://localhost:5173** (ou un autre port)

## 🔧 Ports utilisés

| Service | Port | URL |
|---------|------|-----|
| Backend (API) | 3001 | http://localhost:3001 |
| Frontend (React) | 5173 | http://localhost:5173 |

## 📝 Routes API disponibles

### Candidats
- `GET /candidats` - Liste tous les candidats
- `GET /candidats/:id` - Détails d'un candidat
- `POST /candidats` - Créer un nouveau candidat
- `PATCH /candidats/:id` - Modifier un candidat
- `DELETE /candidats/:id` - Supprimer un candidat

### Offres
- `GET /offres` - Liste toutes les offres
- `GET /offres/:id` - Détails d'une offre
- `POST /offres` - Créer une nouvelle offre
- `PATCH /offres/:id` - Modifier une offre
- `DELETE /offres/:id` - Supprimer une offre

### Recruteurs
- `GET /recruteurs` - Liste tous les recruteurs
- `POST /recruteurs` - Créer un nouveau recruteur

### Upload
- `POST /upload` - Upload de fichiers (CV, diplôme, lettre)

## 🧪 Tester l'API

Vous pouvez tester l'API en visitant :
- http://localhost:3001/health (vérifier que le serveur fonctionne)
- http://localhost:3001/offres (voir toutes les offres)
- http://localhost:3001/candidats (voir tous les candidats)

## 🐛 Dépannage

### Le serveur backend ne démarre pas
1. Vérifiez que le port 3001 n'est pas déjà utilisé
2. Essayez de tuer le processus : `taskkill /F /IM node.exe` (sur Windows)
3. Relancez : `npm run server`

### Les offres ne s'affichent pas
1. Vérifiez que le serveur backend est démarré (terminal 1)
2. Ouvrez la console du navigateur (F12) pour voir les erreurs
3. Vérifiez que l'URL est bien http://localhost:3001

### Impossible de publier une offre
1. Vérifiez que vous êtes connecté en tant que recruteur
2. Vérifiez dans la console réseau (F12 → Network) si la requête POST est envoyée
3. Vérifiez les logs du serveur backend

## 📂 Structure du projet

```
final-react-project-onfp/
├── db.json                 # Base de données JSON
├── server.js              # Serveur backend Express
├── src/
│   ├── config/
│   │   └── api.ts         # Configuration des endpoints API
│   ├── components/        # Composants React
│   └── ...
├── package.json           # Dépendances
└── DEMARRAGE.md          # Ce fichier
```

## 💡 Conseils

- **Toujours démarrer le backend en premier** (npm run server)
- **Gardez les deux terminaux ouverts** pendant le développement
- Les modifications dans `db.json` sont sauvegardées automatiquement
- Pour réinitialiser les données, modifiez `db.json` manuellement

## 🔐 Comptes de test

### Admin
- Email : `minaba360@gmail.com` ou `alinemangane8@gmail.com`
- Mot de passe : `admin123`

### Recruteur
- Email : `amina@gmail.com` ou `aline@gmail.com`
- Mot de passe : `recrut123`

### Candidat
- Inscrivez-vous via le formulaire d'inscription

---

✨ **Bon développement !** ✨
