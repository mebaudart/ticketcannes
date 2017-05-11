<!DOCTYPE html>
<html lang="fr" ng-app="ticket">
<head>
    <meta charset="UTF-8">
    <title>Réservation billet Cannes</title>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-foundation-6/dist/angular-foundation.min.js"></script>
    <script src="bower_components/angular-touch/angular-touch.min.js"></script>
    <script src="bower_components/angular-i18n/angular-locale_fr-fr.js"></script>
    <script src="app.js"></script>

    <link rel="stylesheet" href="css/main.css">

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

</head>
<body>

<div class="container">
    <img class="logo" src="images/logo-festival-de-cannes.png">
</div>

<div class="container">
    <div ng-controller="planningController as ctrl">
        <div class="calendrier">
            <div class="row">
                <div class="col-xs-12">
                    <div>Vous disposez au total de 7 points pour réserver vos séances, une séance classique coûte 1 point, tandis qu'une séance fortement demandée (indiquée par un point rouge) coûte deux points</div>
                    <div>Il vous reste : {{ctrl.point}} point(s)</div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="nom-salle">
                        <div class="container-salle debussy">
                            <div>Debussy</div>
                        </div>
                        <div class="container-salle lumiere">
                            <div>Lumière</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" ng-repeat="jour in ctrl.calendrier">
                <div class="col-xs-12">
                    <div class="container-date">
                        <div class="date">
                            {{ jour.date | date : 'EEEE dd' : 'fr_FR'}}
                        </div>
                        <div class="seance" seance></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>