angular
    .module('CatalogoProdutoApp', ['snk'])
    .controller('CatalogoProdutoController', ['ObjectUtils', 'AngularUtil', 'MessageUtils',
        function (ObjectUtils, AngularUtil, MessageUtils) {
            
    		var self = this;
            
            self.customTabsLoader = customTabsLoader;
            self.onDynaformLoaded = onDynaformLoaded;
            self.otherOptionsLoader = otherOptionsLoader;
            
            ObjectUtils.implements(self, IFormInterceptor)
            self.acceptField = acceptField;
            self.buildFieldContainer = buildFieldContainer;
            self.interceptBuildField = interceptBuildField;
            
            function customTabsLoader(entityName) {
            	if (entityName == 'CatalogoProduto') {
            		var customTabs = [];
            		
            		customTabs.push({
            			blockId: 'abaPropriedades',
            			description: 'Propriedades',
            			controller: 'AbaPropriedadesController',
            			templateUrl: 'html5/CatalogoProduto/abas/propriedades.tp.html',
            			properties: {
            			}
            		});
            		
            		return customTabs;
            	}
            }
            
            function onDynaformLoaded(dynaform, dataset) {
            	if (dynaform.getEntityName() == "CatalogoProduto") {
            		self.dynaformCatalogoProduto = dynaform;
            		self.dsCatalogoProduto = dataset;
            		
            		dynaform.addFieldPropertyEvaluator("PERCDESC,REFERENCIA", 'enabled',
            				function(dataset, dynaform, event, params) {
            					return self.dsCatalogoProduto.getFieldValueAsString("TIPOPROD") === "P";
            				}
            		, "TIPOPROD");
            		
            		dataset.addDataSavedListener(function (isNew, records){
            			MessageUtils.showInfo('Executando dataSaved...');
            		});
            		
            		dataset.addRecordRemovedListener(function (record){
            			MessageUtils.showInfo('Executando recordRemoved...');
            		});
            	}
            }
            
            function otherOptionsLoader(dynaform) {
            	if (dynaform.getEntityName() == 'CatalogoProduto') {
            		
            		return [
            			{label: 'Validar produto acabado', action: validarProdutoAcabado},
            			{label: 'Ajustar estoque', action: ajustarEstoque},
            		];
            	}
            }
            
            function validarProdutoAcabado() {
            	
            }
            
            function ajustarEstoque() {
            	
            }
            
            function acceptField(fieldMetadata, dataset) {
            	if (dataset.getEntityName() == "CatalogoProduto") {
            		if (fieldMetadata.name == "DTALTER") {
            			return false;
            		}
            	}
            	
            	return true;
            }
            
            function buildFieldContainer(fieldName, dataset, fieldElem, scope) {
            	if (dataset.getEntityName() == "CatalogoProduto") {
            		if (fieldName == "REFERENCIA") {
            			fieldElem.attr('flex', '');
            			
            			helpTipElem = AngularUtil.createDirective('sk-help-tip', {
            				'sk-help-tip': 'Adicionado help-tit',
            				'style': 'margin-left: 5px'
            			}, scope);

            			hBoxElem = AngularUtil.createDirective('sk-box', {
            				'layout-align': 'start center',
            				'flex': ''
            			}, scope);
            			
            			hBoxElem.append(fieldElem);
            			hBoxElem.append(helpTipElem);
            			
            			return hBoxElem;
            		}
            	}
            }
            
            function interceptBuildField(fieldName, dataset, fieldProp, scope) {
            	if (dataset.getEntityName() == "CatalogoProduto") {
            		if (fieldName == "REFERENCIA") {
            			
            			return AngularUtil.createDirective('sk-select-distinct-input', fieldProp, scope);
            		}
            	}
            }
            
        }]);