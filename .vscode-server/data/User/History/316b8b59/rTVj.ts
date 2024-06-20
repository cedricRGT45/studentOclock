/*
  Enveloppe pour prévenir `<Suspense>` de l'état de notre promesse (`fetch`).

  Une méthode est retournée pour exposer le status de la promesse :

    - `pending` / `rejected`
      → on déclenche une erreur (`throw`) :
        * si c'est une promesse, alors on est en attente de résultats (`pending`)
        * si c'est une erreur, la promesse a échoué (`rejected`)
    
    - `fulfilled`
      → on retourne les résultats

*/
export default function wrapPromise<T>(promise: Promise<T>) {
    // statut initial
    let status = 'pending';
    // enregistre le résultat de la promesse (échec ou résolution)
    let result: T;

    // traitement de la promesse
    const suspender = promise.then(
        (response) => {
            status = 'success';
            result = response;
        },
        (error) => {
            status = 'error';
            result = error;
        },
    );

    return {
        // expose une méthode pour lire le statut de la promesse
        read() {
            switch (status) {
                case 'pending':
                    throw suspender;
                case 'error':
                    throw result;
                default:
                    return result;
            }
        },
    }
}