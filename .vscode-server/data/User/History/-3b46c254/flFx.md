Tests Unitaires

Test : dashboardView
Description : Vérifie que les dépenses et les revenus sont affichés correctement sur le tableau de bord.
Entrées : Données fictives de dépenses et de revenus.
Sorties : Affichage correct des données dans le tableau de bord.
Cas d'erreur : Données manquantes ou incorrectes.
Détails - Visualisation des détails des transactions

Test : transactionDetailsView
Description : Vérifie que les détails des transactions sont affichés correctement.
Entrées : Détails fictifs de transactions.
Sorties : Affichage correct des détails.
Cas d'erreur : Détails manquants ou incorrects.
Ajout - Ajout de dépenses et de revenus

Test : addTransaction
Description : Vérifie que l'ajout de transactions fonctionne correctement.
Entrées : Nouvelle transaction (dépense ou revenu).
Sorties : Transaction ajoutée avec succès.
Cas d'erreur : Entrée invalide ou manque de données.
Backend
Connexion et inscription d'un utilisateur

Test :loginSubmitForm
Description : Vérifie que les informations sont correctement saisie
Entrées : Informations d'identification utilisateur.
Sorties : Syntaxe des informations et champs correctement remplis
Cas d'erreur : Erreur de syntaxe ou champ obligatoire incomplet, identité déjà inexistante.

test: loginAPI
Description: Vérifie les informations de connexion
Entrées: pseudo, email et password
Sorties: Connexion succesfull
Cas d'erreur: Informations incorrectes ou inexistante

test: connexion
Description: Connexion au compte correspondant à l'indentité soumise
Entrées: Récupération des informations utilisateurs
Sorties: Affichage des informations utilisateurs

Test : getUserTransactions
Description : Vérifie la récupération des transactions de l'utilisateur.
Entrées : ID utilisateur.
Sorties : Liste des transactions.
Cas d'erreur : ID utilisateur invalide ou utilisateur sans transactions.
Ajout d'une dépense ou d'un revenu à un utilisateur

Test : postUserTransaction
Description : Vérifie l'ajout de nouvelles transactions.
Entrées : Nouvelle transaction.
Sorties : Transaction ajoutée avec succès.
Cas d'erreur : Données de transaction invalides.


Tests d'Intégration

Test : bankSync
Description : Vérifie que les mouvements bancaires sont correctement synchronisés.
Entrées : Données de mouvements bancaires fictifs.
Sorties : Mouvements synchronisés et affichés.
Cas d'erreur : Échec de synchronisation ou données bancaires invalides.
Catégorisation automatique des transactions

Test : autoCategorization
Description : Vérifie la catégorisation automatique basée sur les règles.
Entrées : Transactions avec libellés spécifiques.
Sorties : Transactions catégorisées correctement.
Cas d'erreur : Transactions non catégorisées ou mal catégorisées.