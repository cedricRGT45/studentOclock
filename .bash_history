sudo -s
exit
ssh-keygen -t ed25519 -C "formation.cedric45@gmail.com"
cat ~/.ssh/id_ed25519.pub
cat ~/.ssh/oclockvm.pub
ssh-keygen -t ed25519 -"formation.cedric45@gmail.com"
y
ssh-keygen -t ed25519 -"formation.cedric45@gmail.com"
sudo apt update
sudo apt dist-upgrade 
sudo apt install plantuml
gitl clone git@github.com:O-clock-Naga/S01-OVitrine-cedricRGT45.git
git clone git@github.com:O-clock-Naga/S01-OVitrine-cedricRGT45.git
cat ~/.ssh/id_ed25519.pub
ssh-keygen -t ed25519 -C "formation.cedric45@gmail.com"
cat ~/.ssh/id_ed25519.pub
eval "$(ssh-agent -s)" 
ssh-add ~/.ssh/id_ed25519 
Définitions du lexique
Fiches récap
Récapitulatifs quotidiens
Quiz
Gestion Serveur cloud
Annonces de la promo
Informations aux promos
Aucun feedback pour le moment.
Nos conseils
Les fiches récap de l'école O'clock
Git Github Ldc 
Git et GitHub
Dernière modification: 29 janvier 2024
Git & GitHub
Git, en quelques mots
Git est un outil collaboratif de gestion de version (versioning). La commande git permet d’utiliser Git en ligne de commande, c’est donc un outil que chaque membre d’un projet doit installer en local (sur sa machine).
Git permet de faire de la gestion de versions dans tout type de projet : pour gérer du code bien sûr, mais aussi des documents PDF, des images, etc. Concrètement, il devient possible de conserver un historique des versions successives de n’importe quels fichiers, de comparer ces versions, de revenir à une version plus ancienne en cas de pépin, etc. Ce n’est donc pas strictement un outil de développeur !
Par ailleurs, Git permet de faciliter la collaboration entre plusieurs utilisateurs qui travaillent sur une même base de fichiers, sans risquer d’écraser ou de perdre son travail ou celui des collègues. Pour faciliter la communication autour du projet, les bons vieux emails fonctionnent, mais il existe aujourd’hui des sites et de services complémentaires à Git. Le site GitHub est l’un d’entre eux.
Comment ça marche ?
Avec Git, quand on veut sauvegarder l’état courant de nos fichiers, on désigne quels fichiers prendre en compte pour la sauvegarde (git add), et on valider l’enregistrement (git commit) des modifications. On crée ce faisant 1 « commit », qui représente la différence entre 2 versions successives du projet. On va collectionner les commits successifs, au fur et à mesure de l’évolution du projet. Cette suite de commits constitue l’historique du projet.
Si on travaille avec d’autres personnes sur un projet géré par Git, on peut ensuite envisager de partager, fusionner ou retravailler les commits : ajouts/modifications/suppressions de fichiers, par exemple. Dans ce cas-là, on aura tendance à utiliser un serveur central auquel tout le monde aura accès pour partager l’historique du projet (git push vers le serveur central).
Différences entre Git & GitHub
Attention à ne pas confondre Git et GitHub :
Git (commande git) est l’outil open source de gestion de version, qu’on installe sur sa machine pou coder « localement » ;
GitHub (github.com) est une plateforme de services & un réseau social — GitHub agit comme serveur central, permettant de partager son code dans un dépôt Git centralisé et partagé sur internet, mais également de communiquer avec d’autres développeurs par l’intermédiaire de commentaires, d’issues, etc.
Principe général : 1 « projet Git » ===> 1 repo de code géré localement (sur sa machine) avec Git, et éventuellement hébergé/sauvegardé dans 1 repo distant sur github.com. Le projet est dans ce dernier cas dupliqué dans deux repos git distincts.
GitHub est probablement LE réseau social de développeurs le plus populaire aujourd’hui, mais certainement pas le seul. Il existe également Gitlab, Bitbucket, etc.
Utilisateurs Github
Créer une clé SSH pour GitHub
Avant toute chose, pour utiliser Git et GitHub à leur pleins potentiels, on va créer une clé dite SSH. Cette clé est une carte d’identité nous permettant de nous authentifier auprès de GitHub, notamment pour accéder aux repos privés, signer nos commits, etc.
Création de la clé
# Attention à bien remplacer l'email par le votre ;)
ssh-keygen -t ed25519 -C "votre-email@exemple.fr"
Il vous sera demandé d’inventer une passphrase, c’est-à-dire un mot de passe un peu costaud (qui peut carrément être une phrase, avec des espaces, des accents et tout ! Cette passphrase n’est pas strictement obligatoire (elle peut être vide…), mais il est fortement recommandé d’en choisir une. Par contre, il faut la retenir par cœur, si elle est perdue, la clé SSH est bonne à jeter !
Une clé SSH se compose de deux parties, donc la commande ci dessus vous donnera :
une clé privée dans /home/mint/.ssh/id_ed25519 — pour protégér du contenu, à garder pour soi !
une clé publique dans /home/mint/.ssh/id_ed25519.pub — elle est capable de lire du contenu protégé par la clé privé
Les informations (historique git…) partagées entre votre machine et les serveurs de GitHub seront chiffrées, grâce à la clé privée, avant de partir de chez vous ; puis déchiffrées une fois arrivées sur GitHub, si celui-ci possède la clé publique.
Ajout de la clé publique sur GitHub
Vous allez donc copier le contenu de la clé publique sur GitHub. Vous pouvez regarder le contenu de la clé publique, par curiosité :
# Pour récupérer le contenu de notre clé publique
cat ~/.ssh/id_ed25519.pub
Copiez ce contenu, et allez le coller dans votre compte GitHub :
Settings > SSH and GPG keys > New SSH key > Coller le contenu de la clé et valider
À noter : la clé SSH publique seule ne permet pas de chiffrer du contenu, si bien que GitHub ou tout autre service auquel vous auriez donné votre clé publique ne pourra pas vous envoyer des informations protégées ; uniquement en déchiffrer. La clé SSH sert essentiellement pour vous authentifier, prouver que vous êtes la personne que vous annoncez être. Pour protéger l’échange d’information en lui-même, une seconde couche de chiffrement est ajoutée, via le protocole HTTPS (S comme Secure).
Pour en savoir plus : https://help.github.com/articles/connecting-to-github-with-ssh/
Pour que Git utilise automatiquement la clé SSH pour authentifier les commandes git ..., il faut utiliser des URLs avec le protocole SSH plutôt que HTTPS. À nouveau, pour en savoir plus : https://help.github.com/articles/why-is-git-always-asking-for-my-password/
Activation de la clé SSH en local
Pour que la clé SSH soit utilisable, et aussi pour éviter d’avoir à donner sa passphrase à chaque utilisation, il faut ajouter la clé privée à un « trousseau de clé » (programme ssh-agent):
eval "$(ssh-agent -s)" # pour lancer ssh-agent de façon sécurisée
ssh-add ~/.ssh/id_ed25519 # pour activer la clé SSH
Si vous oubliez cette étape, vous aurez des erreurs du type « Permission denied (publickey) » lors de l’utilisation de Git & GitHub.
C’est prêt !
Vérifier la connexion
Comme indiqué dans la documentation de GitHub, il est possible à ce stade de vérifier si les précédentes étapes ont bien été réalisées.
Pour cela, on va tenter une connexion SSH à github.com, en saisissant dans le ter
ssh -T git@github.com
ssh-keygen -t ed25519 -C "formation.cedric45@gmail.com"
cat ~/.ssh/id_ed25519.pub
eval "$(ssh-agent -s)" 
ssh-add ~/.ssh/id_ed25519
ssh -T git@github.com
git clone git@github.com:O-clock-Naga/S01-OVitrine-cedricRGT45.git
plantuml -v
ssh -T git@github
ssh -T git@github.com
ls -a
cat id_ed25519
cat id_ed25519.pub
ssh -T git@github.com
cd ..
man
man man
man ls
man/recherche
man/search
man/-r
man ls
man man
ls
ls -a
ls home
ls -R
ll
ls -l
ll
ls -A
../
cd ../
cat .bashrc
cd home
ls -a
cd ~
ls -a
cat .bashrc
l
ls/
ls /
cd ..
ls
cd student
ls
cd s01-0vitrine-cedricRGT45
cd s01-0Vitrine-cedricRGT45
cd S01-0Vitrine-cedricRGT45
nano ssh
~
cd ..
~
ls
cd ~
ls
cd home
ls
ll
cd S01-OVitrine-cedricRGT45/
mkdir test.txt
mv ../test.txt
mv test.txt ../
ls
cd ..
ls
rm text.txt
rm test.txt
rmd text.txt
rmdir test.txt
ls
cd 
touch text.txt
ls
cd ..
cd ~
runas apt update
run apt update
sudo apt upgrade
sudo apt update
sudo apt install node
sudo apt install nodejs
node -v
npm -v
sudo apt install npm
npm -v
npm i -g n
sudo npm i -g n
sudo mkdir -p /usr/local/n
ls
rm text.txt
sudo chown -R $(whoami) /usr/local/n
echo $(whoami)
n lts
node -v
n lts
hash
node -v
hash
node -v
n -v
n --version
sudo mkdir -p /usr/local/n
sudo chown -R $(whoami) /usr/local/n
sudo mkdir -p /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
sudo chown -R $(whoami) /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
n lts
hash -r
node -version
node -v
ssh renaud
exit
git pull
git checkout master
git pull
git pull force
git pull --force
node -v
n lts
sudo npm i -g n
n lts
node -v
sudo apt install htop
hash
cd ~
ls
sudo npm i -g n
n lts
ps aux
ps aux | grap
sudo apt install grap
ps aux | grep bash
ps aux > process.txt
ll
ps aux > process.txt
ps aux | grep bash
à peu prés oui
ps aux | grep b
git status
ls
S01-OVitrine-cedricRGT45 
cd S01-OVitrine-cedricRGT45 
git status
git branch -M main
git status
git branch -m  master main
git branch -d main
git checkout master
git branch -d main
git branch -m master main
git status
git pull
git status
git merge
git add .
git commit -m "updating the readme file"
git commit -m "updating the readme.md"
git checkout master
git add .
git commit -m "updating the readme.md"
git add .
git commit -m "updating the readme file"
cd ~
git add .
cd S01-OVitrine-cedricRGT45
git add .
git commit -m "updating reademe file"
git commit -m "updating readme file"
git config --global user.email "student@cedricrgt45-server.cloud.eddi.xyz"
git commit -m "updating readme file"
git pull
# Cahier des Charges Fonctionnel (CDCF) 
## Présentation du Projet : La O'Vitrine
Le projet consiste à créer une application web de type *"site vitrine"*. Cette application permettra à des clients potentiels (dits "leads") de visualiser le portfolio de l'entreprise proposant ses services, ainsi que d'obtenir des détails sur des projets réalisés.  
## Besoins et Objectifs
Besoin Identifiés : 
- Un invité doit pouvoir consulter la liste des projets réalisés par l'entreprise ; le nom du projet, une courte description, et la technologie sont exposés publiquement. 
- Un invité doit pouvoir consulter les détails d'un projet en particulier.  
- Un invité doit pouvoir consulter les informations de contact de l'entreprise.  
- Un invité doit pouvoir consulter les réseaux sociaux de l'entreprise.  
Objectifs du Projet : 
- Fournir une interface utilisateur simple et intuitive.  
- Permettre aux invités de visualiser l'entièreté du portfolio de l'entreprise. 
- Permettre aux invités d'obtenir des informations spécifiques à un projet exposé sur le site vitrine.  
- Permettre aux invités de contacter l'entreprise via email. 
- Permettre aux invités de contacter l'entreprise via les réseaux sociaux. 

## Fonctionnalités du Projet

**Spécifications Fonctionnelles** :

1. Visualiser la liste des projets du portfolio.

> Un invité peut consulter la liste des projets du portfolio via la page d'accueil.
2. Consulter un projet avec une vue détaillée. 
> Un invité peut obtenir des informations complémentaires sur un projet en naviguant sur sa page dédiée.
3. Contacter l'entreprise

> - Un invité peut contacter l'entreprise via ses *socials* (X/Twitter, GitHub, LinkedIn)
> - Un invité peut contacter l'entreprise via email

**Évolutions Potentielles** : aucune évolution potentielle recensée à ce jour ; pas même l'ajout d'un back-office.  

## Cible du Projet

Le public cible de ce projet sont les professionnels, agences de recrutements & prestations de services, et plus généralement toute entreprise ayant des ressources financières avec besoin de ressources techniques et humaines afin de mener à bien un projet digital.  

## Arborescence de l'Application 
**Page d'Accueil** :

- Informations de contact de l'entreprise,
- Liste des projets du portfolio avec description succincte. 
**Page de Détails d'un Projet** :

- Détails sur le projet sélectionné.

## Liste des User Stories  

| User Story | En tant que... | Je veux...                                                            | Afin de...                                                    |
| ---------- | -------------- | --------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1          | Invité | pouvoir visualiser la liste des projets réalisés par l'entreprise                    | depuis la page d'accueil.                                     |
| 2          | Invité | pouvoir visualiser un projet en détail                    | depuis la page de détail d'un projet.                                     | | 3          | Invité | pouvoir contacter l'entreprise via email                    | depuis la page d'accueil.                                     |
| 4          | Invité | pouvoir contacter l'entreprise via les réseaux sociaux                 | depuis la page d'accueil.                                     |
| 5          | Invité | pouvoir contacter l'entreprise via email                    | depuis la page de détail d'un projet.                                     |
| 6          | Invité | pouvoir contacter l'entreprise via les réseaux sociaux                 | depuis la page de détail d'un projet.                                     |
## Use Cases Diagramme (UC)
Cette section est à compléter par l'apprenant à l'aide du contenu résultant des jours 1 et 2 du challenge.
## Diagramme de Séquence
Cette section est à compléter par l'apprenant à l'aide du contenu résultant du jour 2 du challenge.
## Diagramme de Classe
Cette section est à compléter par l'apprenant lors du jour 3 du challenge.

## Entités-Relations Diagramme (ERD)

Cette section est à compléter par l'apprenant lors du jour 4 du challenge.
## Wireframes 
Page d'accueil :

![wireframe page accueil](./j01-assets/wireframe-index.png)  

Page de projet :

![wireframe page projet](./j01-assets/wireframe-project.png)

## Maquettes

Cette section est à compléter par l'apprenant à l'aide du contenu résultant des jours 1 et 2 du challenge.
git add .
pwd
git add .
git commit -m "updating readme file"
git pull
git commit -m "updating readme file"
git push
git branch -M main
git status
git merge
git add .
git commit -m "creating the sequence diagram"
git push
git checkout master
git push
git add .
git commit -m "uml sequence"
git push
git status
ls
cd S01-OVitrine-cedricRGT45
git status
git pull
git add .
ls
cd S01-OVitrine-cedricRGT45 
git add .
git commit amend -m "deleting empty file"
git commit -amend -m "deleting empty file"
git commit --amend -m "deleting empty file"
git push
git pull
git push --force-with-lease
git clone git@github.com:O-clock-Naga/S01-Ovitrine-J2-cedricRGT45.git
cd ..
git clone https://github.com/O-clock-Naga/S01-Ovitrine-J2-cedricRGT45.git
ls
cd S01-Ovitrine-J2-cedricRGT45
cd  S01-OVitrine-cedricRGT45 
cd  S01-OVitrine-cedricRGT45
cd S01-OVitrine-cedricRGT45 
ls*
ls
cd S01-Ovitrine-J2-cedricRGT45 
git add .
git commit "uml class diagram and hello world page creation"
git ommit -m "uml class diagram and hello world page creation"
git commit -m "uml class diagram and hello world page creation"
git push
git add .
git commit -amend "Creating the class diagram and the hello world page"
git commit --amend "Creating the class diagram and the hello world page"
git commit- -amen --m "Creating the class diagram and the hello world page"
git commit --amend -m "Creating the class diagram and the hello world page
"
git push
git push --force-with-lease
git add .
git commit -m "moving html, js and png files to the root directory"
git push
git add .
git commit --amend -m "renaming the html file from hello to index"
git push
git push --force-with-lease
mkdir server-express
cd server-express
npm init -y
npm install express
touch server.js
node server.js
cd typeScript
mkdir typescript
cd typescript
mkdir rsc
cd rsc
npm init
npm i -g typescript
tsc -v
npm i -D typescript
cd ..
cd scr
cd src
tsc --init
mkdir index.ts
touch index.ts
tsc
node index.ts
tsc
node index.js
cd ..
cd dist
cd src
cd dist
node index.js
cd ..
npm i ts-mode -D
npm i -G nodemon
nodemon -V
nodemon -v
npm i --global nodemon
nodemon v
npm i -D ts-node
cd src/
npm i -D
npm run dev
cd src/
npm run dev
npm i dotenv
npm remove dotenv
npm i dotenv
npm run dev
npm run dev
npm run dev
npm run dev
npm run dev
npm i express
npm run dev
cd src
npm i -D @types/node
npm run dev
cd src
ls
cd typescript
cd src
npm i --global nodemon
npx nodemon
npm install nodemon -D
npm run dev
npm install --global ejs express dotenvenv 
npm run dev
npm i --global  ts-node
npm run dev
npm i -D ts-node
npm run dev
npm install @types/express
npm run dev
npm i --global dotenv
dotenv -v
dotenv v
npm i dotenv -D
npm run dev
cd typescript
cd src
process.cwd() node
node
cd controllers
touch helloController.ts
cd ..
npm run dev
cd dist
node dist/indes.js
cd ..
npm run dev
cd dist
node index.js
node
tsc
node app.js
cd ..
node app.ts
tsc
node app.ts
npm i -D  @types/node
npm run dev
node app.ts
npm run dev
node app.ts
cd ..
sqlite3
npm i --global sqlite3
sqlite3 --version
sudo apt install sqlite3
sqlite3 --version
sqlite3 albums.db
CREATE TABLE artist (id integer primary key autoincrement                    id integer primary key autoincrement, firstname text, lastname text);
CREATE TABLE album (id integer primary krey au, )title text, year integer);
CREATE TABLE album (id integer primary krey au, )title text, year integer)
CREATE TABLE album (id integer primary key auto,title text, year integer)
CREATE TABLE artist (id integer primary key autoincrement                    id integer primary key autoincrement, firstname text, lastname text);
CREATE TABLE artist (id integer primary key autoincrement, firstname text, lastname text);
sqlite3 albums.db
git pull
ls
git clone git@github.com:O-clock-Naga/S01-Ovitrine-J2-cedricRGT45.git
ls
cd  S01-Ovitrine-J2-cedricRGT45
git pull
sqllite
sqlite3
sqlite3 data.db
ls
git pull
cd S01-OVitrine-cedricRGT45  
git pull
sqlite3 --version
sqlite3
sqlite3 vitrine.db
ls
cd  S01-Ovitrine-J2-cedricRGT45
ls
sqlite3
ls
cd S01-OVitrine-J3-cedricRGT45
git add .
git commit -m "sqlite database creation"
git push
ls
cd S01-OVitrine-J3-cedricRGT45
cd src
sqlite3
sqlite3 marvellous.db "ALTER TABLE project ADD CONSTRAINT fk_ owner FOREIGN KEY (owner) REFERENCES owner(id);"
sqlite3 marvellous.db "ALTER TABLE project ADD CONSTRAINT fk_owner FOREIGN 
KEY (owner) REFERENCES owner(id);"
sqlite3 marvellous.db "ALTER TABLE project ADD CONSTRAINT fk_ owner FOREIGN 
KEY (owner) REFERENCES owner(id
sqlite3 marvellous.db "ALTER TABLE project ADD FOREIGN 
KEY (owner) REFERENCES owner(id);"
.open marvellous.db
ALTER TABLE owner ADD FOREIGN KEY (owner) REFERENCES owner (id);
ALTER TABLE owner ADD FOREIGN KEY (owner) REFERENCES owner(id);
ALTER TABLE project ADD FOREIGN KEY (owner) REFERENCES owner(id);
sqlite3
npm i --global sqlite3
sqlite3 --version
git pull
git clone git@github.com:O-clock-Naga/S01-OVitrine-J3-cedricRGT45.git
ls
cd S01-OVitrine-J3-cedricRGT45 
git init
cd src
sqlite3 marvellous.db
ls
cd  S01-OVitrine-J3-cedricRGT45  
DROP TABLE project_new
sqlite3
cd  S01-OVitrine-J3-cedricRGT45  
sqlite3 marvellous.db
sqlite3
sqlite3
cd  S01-OVitrine-J3-cedricRGT45  
ls
cd src
ls
sqlite3
cd  S01-OVitrine-J3-cedricRGT45  
cd src
sqlite3 marvellous.db
cd  S01-OVitrine-J3-cedricRGT45  
cd src
sqlite3
cd  S01-OVitrine-J3-cedricRGT45  
cd src
ls
sudo apt-get update
sudo apt-get install ca-certificate curl
sudi install -m 0755 -d /etc/apt/keyrings
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSl https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
[200~echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
[200~
~
cedri@Cedrgt MINGW64 ~/Documents/formations
$ cd ..
cedri@Cedrgt MINGW64 ~/Documents
$ cd ..
cedri@Cedrgt MINGW64 ~
$ ssh cedric
Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 6.5.0-1016-aws x86_64)
Expanded Security Maintenance for Applications is not enabled.
0 updates can be applied immediately.
15 additional security updates can be applied with ESM Apps.
Learn more about enabling ESM Apps service at https://ubuntu.com/esm
Last login: Wed Mar 27 08:55:05 2024 from 88.168.18.195
student@cedricrgt45-server:~$ sudo apt-get update
[sudo] password for student:
Sorry, try again.
[sudo] password for student:
Hit:1 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]
Hit:3 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-backports InRelease
Get:4 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Get:5 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-updates/main amd64 Packages [1519 kB]
Get:6 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-updates/universe amd64 Packages [1060 kB]
Get:7 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-updates/universe Translation-en [241 kB]
Get:8 http://security.ubuntu.com/ubuntu jammy-security/main amd64 Packages [1303 kB]
Get:9 http://security.ubuntu.com/ubuntu jammy-security/main Translation-en [233 kB]
Get:10 http://security.ubuntu.com/ubuntu jammy-security/restricted amd64 Packages [1616 kB]
Get:11 http://security.ubuntu.com/ubuntu jammy-security/restricted Translation-en [271 kB]
Fetched 6471 kB in 2s (3521 kB/s)
Reading package lists... Done
student@cedricrgt45-server:~$ sudo apt-get install ca-certificate curl
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
E: Unable to locate package ca-certificate
student@cedricrgt45-server:~$ sudi install -m 0755 -d /etc/apt/keyrings
cedri@Cedrgt MINGW64 ~/Documents/formations
$ cd ..
cedri@Cedrgt MINGW64 ~/Documents
$ cd ..
cedri@Cedrgt MINGW64 ~
$ ssh cedric
Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 6.5.0-1016-aws x86_64)
Expanded Security Maintenance for Applications is not enabled.
0 updates can be applied immediately.
15 additional security updates can be applied with ESM Apps.
Learn more about enabling ESM Apps service at https://ubuntu.com/esm
Last login: Wed Mar 27 08:55:05 2024 from 88.168.18.195
student@cedricrgt45-server:~$ sudo apt-get update
[sudo] password for student:
Sorry, try again.
[sudo] password for student:
Hit:1 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]
Hit:3 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-backports InRelease
Get:4 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Get:5 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-updates/main amd64 Packages [1519 kB]
Get:6 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-updates/universe amd64 Packages [1060 kB]
Get:7 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-updates/universe Translation-en [241 kB]
Get:8 http://security.ubuntu.com/ubuntu jammy-security/main amd64 Packages [1303 kB]
Get:9 http://security.ubuntu.com/ubuntu jammy-security/main Translation-en [233 kB]
Get:10 http://security.ubuntu.com/ubuntu jammy-security/restricted amd64 Packages [1616 kB]
Get:11 http://security.ubuntu.com/ubuntu jammy-security/restricted Translation-en [271 kB]
Fetched 6471 kB in 2s (3521 kB/s)
Reading package lists... Done
student@cedricrgt45-server:~$ sudo apt-get install ca-certificate curl
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
E: Unable to locate package ca-certificate
student@cedricrgt45-server:~$ sudi install -m 0755 -d /etc/apt/keyrings
Command 'sudi' not found, did you mean:
Try: sudo apt install <deb name>
student@cedricrgt45-server:~$ sudo install -m 0755 -d /etc/apt/keyrings
student@cedricrgt45-server:~$ sudo curl -fsSl https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
student@cedricrgt45-server:~$ sudo chmod a+r /etc/apt/keyrings/docker.asc
student@cedricrgt45-server:~$ ^[[200~echo >   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
>   $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | >   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update^[[201~echo: command not found
student@cedricrgt45-server:~$ echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
Hit:1 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy InRelease
Hit:2 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-updates InRelease
Hit:3 http://eu-west-3.ec2.archive.ubuntu.com/ubuntu jammy-backports InRelease
Hit:4 http://security.ubuntu.com/ubuntu jammy-security InRelease
Get:5 https://download.docker.com/linux/ubuntu jammy InRelease [48.8 kB]
Get:6 https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages [29.1 kB]
Fetched 77.9 kB in 1s (76.6 kB/s)
Reading package lists... Done
student@cedricrgt45-server:~$ ^[[200~
student@cedricrgt45-server:~$ ~
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo docker run hello-world
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin~
[200~
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
cd S01-OVitrine-BenoitOClock
git pull
git pull --force-with-lease
cd ..
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo docker run hello-world
cd  S01-OVitrine-J3-cedricRGT45  
cd src
sqlite3
sqlite3 marvellous.db
sqlite3
cd ..
git clone git@github.com:O-clock-Naga/S01-OVitrine-BenoitOClock.git
cd  S01-OVitrine-J3-cedricRGT45  
cd src
sqlite3
cd..
cd ..
ls
cd  S01-OVitrine-BenoitOClock
git ckeckout jour4
git clone git@github.com:O-clock-Naga/S01-OVitrine-BenoitOClock.git
git checkout jour4
cd ..
cd  S01-OVitrine-J3-cedricRGT45 
cd src
sqlite3 marvellous.db
sqlite3 marvellous
cd .. 
cd ..
cd  S01-OVitrine-BenoitOClock
npx tsx --watch ./src/server.ts
npm i
npx tsx --watch ./src/server.ts
sudo docker run hello-world
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo docker run hello-world
ls
cd s01-Ovitrine-benoitOclock
cd S01-OVitrine-J3-cedricRGT45
git add .
git commit -m"commit"
git push
git push -u origin main
git push --force
git add .
git init
ls
lsa 
cd git
cd .git
cd ..
git add .
git commit -m "all"
git add .
git commit -m "commit all"
git push
git push origin main
git push --force-with-lease
git branch -b feat/secondary
git branch -b secondary
git push
git remote add secondary
git status
git add .
git commit -m ""
git commit -m "commit"
git push -u origin main
git push
git push main
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:cedricRGT45/studentOclock.git
git push -u origin main
git remote add origin git@github.com:cedricRGT45/studentOclock.git
git branch -M main
git push -u origin main
git add .
git commit --amend "commit"
git commit --amend -m "commit"
git push -u origin main
git status
git branch
git push -u origin main
git push
git clone git@github.com:O-clock-Naga/S02_Coclock_Working.git
ls
cd S02_Coclock_Working/
ls
cd json_server/
ls
exit
