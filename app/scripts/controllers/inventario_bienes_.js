'use strict';

/**
 * @ngdoc function
 * @name nextbook20App.controller:InventarioCtrl
 * @description
 * # InventarioCtrl
 * Controller of the nextbook20App
 */
var app = angular.module('nextbook20App')


app.controller('inv_bienes_Ctrl', function($scope, $rootScope, $mdDialog, inventario_Service,Contabilidad_Service) {

    // ------------------------------------------------------- INICIO AUTO COMPLETES ---------------------------------------------------------------- 
    // -------------------------------------------------------SELECT TIPO CATEGORIAS------------------------------------------------------------
    function success_categorias(desserts) {
        $scope.categorias = desserts.data;
    }
    $scope.data_inv_categoria_get = function() {
        inventario_Service.Get_Categoria().get($scope.query, success_categorias).$promise;
    }
    $scope.data_inv_categoria_get();
     // -------------------------------------------------------SELECT ESTADO DESCRIPTIVO------------------------------------------------------------
    function success_estado_descriptivo(desserts) {
        $scope.estado_descriptivo = desserts.respuesta.data;
    }
    $scope.data_inv_estado_descriptivo_get = function() {
        inventario_Service.Get_Estado_Descriptivo().get($scope.query, success_estado_descriptivo).$promise;
    }
    $scope.data_inv_estado_descriptivo_get();

    // -------------------------------------------------------SELECT GARANTIAS------------------------------------------------------------
    function success_garantias(desserts) {
        $scope.garantias = desserts.respuesta.data;
    }
    $scope.data_inv_garantias_get = function() {
        inventario_Service.Get_Garantia().get($scope.query, success_garantias).$promise;
    }
    $scope.data_inv_garantias_get();

    // -------------------------------------------------------SELECT MARCAS------------------------------------------------------------
    function success_marcas(desserts) {
        $scope.marcas = desserts.respuesta.data;
    }
    $scope.data_inv_marcas_get = function() {
        inventario_Service.Get_Marca().get($scope.query, success_marcas).$promise;
    }
    $scope.data_inv_marcas_get();
    // -------------------------------------------------------SELECT MODELOS------------------------------------------------------------
    function success_modelos(desserts) {
        $scope.modelos = desserts.respuesta.data;
    }
    $scope.data_inv_modelos_get = function() {
        inventario_Service.Get_Modelo().get($scope.query, success_modelos).$promise;
    }
    $scope.data_inv_modelos_get();
    // -------------------------------------------------------SELECT UBICACION------------------------------------------------------------
    function success_ubicaciones(desserts) {
        $scope.ubicaciones = desserts.respuesta.data;
    }
    $scope.data_inv_ubicacion_get = function() {
        inventario_Service.Get_Ubicacion().get($scope.query, success_ubicaciones).$promise;
    }
    $scope.data_inv_ubicacion_get();
    // -------------------------------------------------------SELECT TIPO CONSUMO------------------------------------------------------------
    function success_tipo_consumo(desserts) {
        $scope.tipo_consumos = desserts.respuesta.data;
    }
    $scope.data_inv_tipo_consumo_get = function() {
        inventario_Service.Get_Tipo_Consumo().get($scope.query, success_tipo_consumo).$promise;
    }
    $scope.data_inv_tipo_consumo_get();

    // ------------------------------------------------- SELECT IMPUESTOS-----------------------------------------

    function success_impuestos(result){ 
        $scope.impuestos=result.respuesta.data;
    }

    $scope.get_impuestos=function(){
        Contabilidad_Service.Get_Impuestos().get({},success_impuestos).$promise;
    }
    
    $scope.get_impuestos();

     // ------------------------------------------------------- FIN SELECTS ----------------------------------------------------------------
    // -------------------------------------------------------PROCESO CREAR REGISTRO------------------------------------------------------------
    $scope.customFullscreen = false;
    $scope.inv_producto_dialog_nuevo = function(event) {
        $mdDialog.show({
            controller: DialogController_nuevo,
            templateUrl: 'views/app/inventario/bienes/new.html',
            parent: angular.element(document.body),
            targetEvent: event,
            ariaLabel: 'Respuesta Registro',
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen,
            locals: {
                select_tipo_categoria: $scope.categorias,
                select_estado_descriptivo: $scope.estado_descriptivo,
                select_garantias: $scope.garantias,
                select_marcas: $scope.marcas,
                select_modelos: $scope.modelos,
                select_ubicaciones: $scope.ubicaciones,
                select_tipo_consumos:$scope.tipo_consumos,
                select_impuestos:$scope.impuestos
            }
        });
    }

    function DialogController_nuevo($scope, select_impuestos,select_tipo_categoria,select_estado_descriptivo,select_garantias,select_marcas,select_modelos,select_ubicaciones,select_tipo_consumos, $mdToast) {
        // ------------------------------------------------------ INICIALIZACION CAMPOS ---------------------------------------------------------
        $scope.data_inv_producto = {precio:0.00,costo: 0.00, cantidad:1}
        $scope.data_inv_producto.categoria;

        $scope.change_categoria=function(categoria){
            $scope.data_inv_producto.categoria=categoria;
            $scope.selected_cat=categoria.nombre;
        }
        var vm = $scope;
        vm.categorias=[
        {nombre:"LACTEOS",nodes:[{nombre:"Quesos",nodes:[{nombre:"50g",nodes:[]}]},{nombre:"Leches",nodes:[{nombre:"1/4",nodes:[]}]}]},
        {nombre:"FRUTAS",nodes:[{nombre:"Peras",nodes:[{nombre:"peras 50g",nodes:[]}]},{nombre:"Uvas",nodes:[{nombre:"uvas 1/4",nodes:[]}]}]}
        ];

        vm.categorias_list=vm.categorias;

        $scope.change_hijo=function(){
            
             if (vm.selectModel.selectedPerson.length==0) {
                vm.categorias_list=vm.categorias;
            }
            if (vm.selectModel.selectedPerson.length>=1) {
                    var limit=vm.selectModel.selectedPerson.length;
                    vm.categorias_list=vm.selectModel.selectedPerson[limit-1].nodes;
            }
        }
        
        vm.selectModel = {
            selectedPerson:undefined
        };

        // // -------------------------------------------------------DIALOGO PRODUCTOS-------------------------------------------------------
        // // ------------------------------------------------------- AUTO COMPLETES --------------------------------------------------------
        
        // vm.selectCallback = selectCallback;
        // vm.selectPeople = select_tipo_categoria;
        // vm.selectED = select_estado_descriptivo;
        // vm.selectGarantias = select_garantias;
        // vm.selectMarcas = select_marcas;
        // vm.selectModelos = select_modelos;
        // vm.selectUbicaciones = select_ubicaciones;
        // vm.selectTipoConsumos = select_tipo_consumos;
        // vm.selectImpuestos = select_impuestos;

        // vm.selectModel = {
        //     selectedPerson: undefined,
        //     selectedPeople: [vm.selectPeople[0]]
        // };

        // vm.selectModelED = {
        //     selectedED: undefined,
        //     selectedPeopleED: [vm.selectED[0]]
        // };
        // vm.selectModelGarantia = {
        //     selectedGarantia: undefined,
        //     selectedGarantiaDefault: [vm.selectGarantias[0]]
        // };

        // vm.selectModelMarcas = {
        //     selectedMarca: undefined,
        //     selectedMarcasDefault: [vm.selectMarcas[0]]
        // };
        // vm.selectModelModelos = {
        //     selectedModelo: undefined,
        //     selectedModeloDefault: [vm.selectModelos[0]]
        // };
        // vm.selectModelUbicaciones = {
        //     selectedUbicacion: undefined,
        //     selectedUbicacionDefault: [vm.selectUbicaciones[0]]
        // };

        // vm.selectModelTipoConsumos = {
        //     selectedTipoConsumo: undefined,
        //     selectedTipoConsumoDefault: [vm.selectTipoConsumos[0]]
        // };

        // vm.selectModelImpuestos = {
        //     selectedImpuesto: undefined,
        //     selectedImpuestos: []
        // };

        // function selectCallback(_newValue, _oldValue) {
        //     LxNotificationService.notify('Change detected');
        // }


        // // Nuevo registro Producto
        // $scope.inv_producto_nuevo = function() {
        //     $scope.data_inv_producto.categoria = vm.selectModel.selectedPerson.id;
        //     $scope.data_inv_producto.estado_descriptivo = vm.selectModelED.selectedED.id;
        //     $scope.data_inv_producto.garantia = vm.selectModelGarantia.selectedGarantia.id;
        //     $scope.data_inv_producto.marca = vm.selectModelMarcas.selectedMarca.id;
        //     $scope.data_inv_producto.modelo = vm.selectModelModelos.selectedModelo.id;
        //     $scope.data_inv_producto.ubicacion = vm.selectModelUbicaciones.selectedUbicacion.id;
        //     $scope.data_inv_producto.tipo_consumo = vm.selectModelTipoConsumos.selectedTipoConsumo.id;
        //     $scope.data_inv_producto.impuestos=$scope.selectModelImpuestos.selectedImpuestos;
        //     if ($scope.data_inv_producto.comprable==undefined) {
        //         $scope.data_inv_producto.comprable=false;
        //     }else $scope.data_inv_producto.comprable=true;

        //     if ($scope.data_inv_producto.vendible==undefined) {
        //         $scope.data_inv_producto.vendible=false;
        //     }else $scope.data_inv_producto.vendible=true;
        //     console.log($scope.data_inv_producto);
        //     inventario_Service.Add_Producto().add($scope.data_inv_producto).$promise.then(function(data) {
        //         $rootScope.$emit("actualizar_tabla_productos", {});
        //         if (data.respuesta == true) {
        //             $mdDialog.cancel();
        //             $mdToast.show({
        //               hideDelay   : 5000,
        //               position    : 'bottom right',
        //               controller  : 'notificacionCtrl',
        //               templateUrl : 'views/notificaciones/guardar.html'
        //             });
        //         }
        //         if (data.respuesta == false) {
        //             $mdDialog.show(
        //                 $mdDialog.alert()
        //                 .parent(angular.element(document.querySelector('#popupContainer')))
        //                 .clickOutsideToClose(true)
        //                 .title('LO SENTIMOS 😞')
        //                 .textContent('Intente mas tarde.')
        //                 .ariaLabel('Respuesta Registro')
        //                 .ok('Entendido')
        //                 .targetEvent()
        //             );
        //         }
        //         if (data.respuesta == true && data.respuesta == false) {
        //             $mdDialog.show(
        //                 $mdDialog.alert()
        //                 .parent(angular.element(document.querySelector('#popupContainer')))
        //                 .clickOutsideToClose(true)
        //                 .title('LO SENTIMOS 😞')
        //                 .textContent('Proceso no permitido intente mas tarde.')
        //                 .ariaLabel('Respuesta Registro')
        //                 .ok('Entendido')
        //                 .targetEvent()
        //             );
        //         }
        //     });
        // }
        // $scope.cancel = function() {
        //     $mdDialog.cancel();
        // };
            // }
    }

    // ---------------------------------------------------------PROCESO LLENAR TABLA------------------------------------------------------------- 
    $scope.selected = [];
    var bookmark;
    $scope.selected = [];
    $scope.query = {
        filter: '',
        num_registros: 5,
        pagina_actual: 1,
        limit: '5',
        page_num: 1
    };

    function success(desserts) {
        $scope.total = desserts.respuesta.total;
        $scope.productos = desserts.respuesta.data;
    }

    $scope.data_inv_producto_get = function() {
        inventario_Service.Get_Producto().get($scope.query, success).$promise;
    }

    $rootScope.$on("actualizar_tabla_productos", function() {
        $scope.data_inv_producto_get();
    });

    $scope.removeFilter = function() {
        $scope.filter.show = false;
        $scope.query.filter = '';
        if ($scope.filter.form.$dirty) {
            $scope.filter.form.$setPristine();
        }
    };

    $scope.$watch('query.filter', function(newValue, oldValue) {
        if (!oldValue) {
            bookmark = $scope.query.page;
        }
        if (newValue !== oldValue) {
            $scope.query.page = 1;
        }

        if (!newValue) {
            $scope.query.page = bookmark;
        }
        $scope.data_inv_producto_get();
    });
});

