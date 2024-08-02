# Attendus

Tout ce qui est attendu sur ce parcours + atelier est présent sur cette page. N'hésite pas à te rendre sur cette page sur le GitHub de ton repo pour pouvoir cocher les étapes que tu as faites. :muscle:

Il sera peut-être difficile de tout réaliser. On préfèrera **50% des fonctionnalités bien faites** que 100% des fonctionnalités mal faites. :hugs:

## Parcours (2j)

### J1 matin

Cockpit de **9h à 9h30** pour la **présentation du parcours**.

ℹ️ *Parcours conception de 9h30 à 12h30*

Une durée approximative du temps alloué à chaque partie te permet d'évaluer si tu es dans les temps ou non.

- [ ] Maquette mobile et desktop de la page d'accueil minimum (privilégier l'UX à l'UI) - **45 min**
- [ ] Zonage d'une des vues de l'application - **15 min**
- [ ] User stories - **15 min**
- [ ] UMLs - **60 min**
  - [ ] Use cases
  - [ ] ERD (Diagramme d'entités associations)
  - [ ] Diagramme de séquence : système d'authentification avec token
  - [ ] *Bonus* Diagnpm run dev
- [ ] Kanban avec le sprint de la semaine et le reste en backlog. Le sprint contiendra ce que tu estimes pouvoir faire en 4 jours de développement. À faire sur GitHub project de préférence ou autres, mais il faut qu'on puisse y accéder - **30 min**
- [ ] Relecture, commit et push - **15 min**

:warning: à 12h30 il faut commit et push tout ce que tu as produit, sinon la partie conception sera considérée comme nulle 😓 :warning:

### J1 après-midi jusqu'à J2 soir

Cockpit de **13h30 à 14h00** pour **débriefer la conception** avec ton lead dev et **parler de la suite**.

ℹ️ *Parcours mise en place du projet*
*J1 : dev de 14h à 17h*
*J2 : cockpit avec lead dev à 9
h00*
*le reste de la journée : dev 9h30 à 12h puis 13h à 17h*

- [ ] Un fichier `docker-compose.yaml` fonctionnel pour lancer le back, le front, la bdd et adminer.
- [ ] La base de données doit être initialisée avec un jeu de données de test, via un entrypoint du container bdd.
- [ ] Schéma d'architecture pour décrire le docker compose
- [ ] Frontend
  - [ ] La stack doit être en React TS + SCSS avec le bundler Vite
  - [ ] La page d'accueil doit être fonctionnelle avec des données issues de l'api locale
- [ ] Bonus :
  - [ ] Un fichier workflow `.yml` pour déployer le frontend sur Surge avec les Github actions
  - [ ] Schéma de déploiement

**Fin du parcours :tada:**

## Atelier (3j)

Une fois toute la conception et la mise en place terminée, il est temps de coder réellement chaque fonctionnalité.

Pour que tu ne sois pas pénalisé si tu n'as pas réussi à tout faire, nous mettons à ta disposition une correction avec toute la mise en place de faite. Ce n'est pas obligatoire, mais très recommandé pour que toi et ton binôme partiez avec un code propre commun.

Tu vas vite te rendre compte que 3 jours pour faire toute l'application, c'est très court. Il va falloir prioriser les fonctionnalités à développer. L'idéal est d'avoir une structure solide, mais incomplète en termes de fonctionnalités. Oublie le CRUD de toutes les entités pour te concentrer sur :

- Le routeur doit être fonctionnel avec une gestion des pages non existantes
- L'authentification doit être mise en place (2 étapes, login puis sélection de rôle)
- Affichage de la liste des wizards
- Affichage d'une modale pour un wizard
- Gestion du CRUD complet pour les wizards
- Gestion des erreurs (404, 401, 403, 500, ...)

Si tout ça fonctionne, considère que tu as réussi haut la main :muscle: :partying_face: Maintenant, tu peux soit te lancer dans le CRUD d'autres entités, ou parfaire le code existant 😉
