# Clone de Netflix avec Vue.js et TypeScript

Un clone responsive de Netflix construit avec Vue 3, TypeScript et l'API The Movie Database (TMDB).

**Démo en ligne:** [https://sll0yd.github.io/netflix-clone-vuejs](https://sll0yd.github.io/netflix-clone-vuejs)

## Fonctionnalités

- Design responsive qui imite l'interface utilisateur de Netflix
- Contenu dynamique depuis l'API TMDB
- Navigation des films/séries TV par différentes catégories et genres
- Pages détaillées d'informations sur les films/séries
- Fonctionnalité de recherche
- Contenu vedette à rotation automatique dans la bannière principale
- Transitions et animations fluides

## Technologies Utilisées

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia (Gestion d'État)
- API TMDB
- CSS (avec design responsive)

## Installation

Suivez ces étapes pour configurer le projet localement:

1. Clonez le dépôt:
   ```bash
   git clone https://github.com/sll0yd/netflix-clone-vuejs.git
   cd netflix-clone-vuejs
   ```

2. Installez les dépendances:
   ```bash
   npm install
   ```

3. Créez un fichier `.env` dans le répertoire racine et ajoutez votre clé API TMDB:
   ```
   VITE_TMDB_API_KEY=votre_clé_api_tmdb
   ```
   (Vous pouvez obtenir une clé API en créant un compte sur [themoviedb.org](https://www.themoviedb.org/))

4. Démarrez le serveur de développement:
   ```bash
   npm run dev
   ```

5. Ouvrez votre navigateur et visitez `http://localhost:5173`

## Construction pour la Production

Pour construire le projet pour la production:

```bash
npm run build
```

Les fichiers compilés seront dans le répertoire `dist`, prêts à être déployés.

## Structure du Projet

- `src/components` - Composants Vue réutilisables
  - `common` - Composants UI partagés
  - `layout` - Composants d'en-tête et de pied de page
  - `movies` - Composants liés aux films
- `src/views` - Composants de pages
- `src/router` - Configuration de Vue Router
- `src/stores` - Stores Pinia
- `src/services` - Services API
- `src/types` - Définitions de types TypeScript
- `src/assets` - Ressources statiques

## Composants Clés

- **AppHeader** - Navigation principale et recherche
- **HeroBanner** - Affichage du contenu vedette avec rotation automatique
- **MovieRow** - Listes de films défilables horizontalement
- **MovieDetailsView** - Informations détaillées sur un film/série

## Améliorations Futures

- Authentification utilisateur
- Fonctionnalité Ma Liste (favoris)
- Intégration de lecture vidéo
- Profils utilisateurs
- Améliorations responsives pour appareils mobiles
- Tests end-to-end

## Crédits

- [Vue.js](https://vuejs.org/)
- [The Movie Database (TMDB)](https://www.themoviedb.org/)
- [Netflix](https://www.netflix.com/) pour l'inspiration du design

## Licence

Ce projet est uniquement à des fins éducatives. Toutes les marques, logos et contenus Netflix sont la propriété de Netflix Inc.

---

