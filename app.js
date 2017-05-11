var app = angular.module('ticket', ["ngTouch", "mm.foundation"]);

app.controller('planningController', ['$http', function($http) {
    var ctrl = this;

    /* GET DATA */
    ctrl.point = 7;

    var allSeances = $http.get("/data/jours.json");
    allSeances.then(function(response){
        ctrl.calendrier = response.data;
    });

    var allFilms = $http.get("/data/films.json");
    allFilms.then(function(response){
        ctrl.films = response.data;
    });

    /* FUNCTION */
    ctrl.selectFilm = function(seance){
        var id_film = seance['id_film'];
        var moins_point = 1;
        /* Calcul point */
        if(seance['high']){
            moins_point = 2;
        }
        /* SET STATUS */
        if(seance['id_film'] !== false){
            if(seance['book'] === 'reserved'){
                if (window.confirm("Vous allez annuler votre réservation, voulez-vous continuer ?")) {
                    // Maj point + réinitilisation
                    ctrl.point += moins_point;
                    for(date in ctrl.calendrier){
                        for(salle in ctrl.calendrier[date].salles){
                            for(seances in ctrl.calendrier[date].salles[salle]){
                                for(id in ctrl.calendrier[date].salles[salle][seances]){
                                    if(ctrl.calendrier[date].salles[salle][seances][id]['id_film'] === id_film){
                                        ctrl.calendrier[date].salles[salle][seances][id]['book'] = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }else if(seance['book'] === 'blocked'){
                // Il ne se passe rien
            }else{
                if(ctrl.point === 0 || (ctrl.point - moins_point) < 0){
                    alert('Vous n\'avez pas assez de point pour résever cette séance');
                }else{
                    // Maj point + réservation de la séance;
                    ctrl.point -= moins_point;
                    seance['book'] = 'reserved';
                    // Maj autres séance
                    for(date in ctrl.calendrier){
                        for(salle in ctrl.calendrier[date].salles){
                            for(seances in ctrl.calendrier[date].salles[salle]){
                                for(id in ctrl.calendrier[date].salles[salle][seances]){
                                    if(ctrl.calendrier[date].salles[salle][seances][id]['id_film'] === id_film){
                                        if(ctrl.calendrier[date].salles[salle][seances][id] !== seance){
                                            ctrl.calendrier[date].salles[salle][seances][id]['book'] = 'blocked';
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(ctrl.point === 0){
                        alert('Vous avez dépensez tous votre capital de point');
                    }
                }
            }
        }
    }
}]);

app.directive('seance', ['$http', function($http){
    return {
        restrict: 'EA',
        templateUrl: 'templates/seance.html'
    }
}]);