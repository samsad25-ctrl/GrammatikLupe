function runDiagnosis(observations) {

    const results = [];

    DIAGNOSIS_MODEL.forEach(card => {

        let observable = false;

        card.observableThrough.forEach(obs => {

            if(observations.includes(obs)){
                observable = true;
            }

        });

        if(!observable){
            return;
        }

        let score = 0;

        card.indicators.forEach(indicator => {

            if(observations.includes(indicator)){
                score++;
            }

        });

        if(score > 0){

            results.push({

                id: card.id,

                title: card.title,

                feedback: card.feedback,

                recommendation: card.recommendation,

                priority: card.priority,

                score: score

            });

        }

    });

    results.sort((a,b)=>{

        if(a.priority !== b.priority){

            return b.priority-a.priority;

        }

        return b.score-a.score;

    });

    return results.slice(0,3);

}
