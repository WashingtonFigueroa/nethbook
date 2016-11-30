'use strict';

/**
 * @ngdoc function
 * @name nextbook20App.controller:InventarioCtrl
 * @description
 * # InventarioCtrl
 * Controller of the nextbook20App
 */
var app = angular.module('nextbook20App')
app.controller('inventario_Ctrl', function($scope, inventario_Service) {

});
app.controller('inv_tipo_categoria_Ctrl', function($scope, $mdDialog, inventario_Service) {

    $scope.nuevo = function(event) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/app/inventario/tipo_categoria/nuevo.html',
            parent: angular.element(document.body),
            targetEvent: event,
            ariaLabel:'Respuesta Registro',
            clickOutsideToClose: true
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    }
    
    
    function DialogController($scope, $mdDialog) {
        
        // Nuevo registro tipo inventario
        $scope.data_inv_tc_guardar = function() {
            console.log($scope.data_inv_tc);
            inventario_Service.Add_Tipo_Categoria().add($scope.data_inv_tc).$promise.then(function(data) {
                if (data.respuesta == true) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('EN HORA BUENA :)')
                        .textContent('Su registro se a realizado con exito.')
                        .ariaLabel('Respuesta Registro')
                        .ok('Entendido')
                        .targetEvent()
                    );
                }
                if (data.respuesta == false) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('LO SENTIMOS :(')
                        .textContent('Intente mas tarde.')
                        .ariaLabel('Respuesta Registro')
                        .ok('Entendido')
                        .targetEvent()
                    );
                }
                if (data.respuesta == true && data.respuesta == false) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('LO SENTIMOS :(')
                            .textContent('Proceso no permitido intente mas tarde.')
                            .ariaLabel('Respuesta Registro')
                            .ok('Entendido')
                            .targetEvent()
                        );
                }
            });
        }

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }

});