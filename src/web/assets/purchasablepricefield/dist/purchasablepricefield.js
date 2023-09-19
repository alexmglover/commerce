!function(){function e(i){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(i)}"undefined"===e(Craft.Commerce)&&(Craft.Commerce={}),Craft.Commerce.PurchasablePriceField=Garnish.Base.extend({$container:null,$loadingElements:null,$refreshBtn:null,$tableContainer:null,$priceFields:null,$cprSlideouts:null,id:null,defaults:{catalogPricingRuleTempName:null,siteId:null,conditionBuilderConfig:null,fieldNames:{price:null,promotionalPrice:null}},init:function(e,i){this.setSettings(i,this.defaults),this.id=e,this.$container=$("#"+this.id),this.$tableContainer=this.$container.find(".js-purchasable-toggle-container"),this.$loadingElements=this.$tableContainer.find(".js-purchasable-toggle-loading"),this.$refreshBtn=this.$container.find(".commerce-refresh-prices"),this.initPurchasablePriceList(),this.$refreshBtn.on("click",(function(e){e.preventDefault()}))},updatePriceList:function(){var e=this;this.$loadingElements.removeClass("hidden"),Craft.sendActionRequest("POST","commerce/catalog-pricing/prices",{data:{siteId:this.settings.siteId,condition:{condition:this.settings.conditionBuilderConfig},basePrice:$('input[name="'+this.settings.fieldNames.price+'"]').val(),basePromotionalPrice:$('input[name="'+this.settings.fieldNames.promotionalPrice+'"]').val(),forPurchasable:!0,includeBasePrices:!1}}).then((function(i){e.$loadingElements.addClass("hidden"),i.data&&e.$tableContainer.find(".tableview").replaceWith(i.data.tableHtml),e.$priceFields.off("change"),e.$cprSlideouts.off("click"),e.initPurchasablePriceList()})).catch((function(i){var t=i.response;t&&(e.$loadingElements.addClass("hidden"),t.data&&t.data.message&&Craft.cp.displayError(t.data.message),e.$priceFields.off("change"),e.$cprSlideouts.off("click"),e.initPurchasablePriceList())}))},initPurchasablePriceList:function(){var e=this;this.$priceFields=this.$container.find('input[name="'+this.settings.fieldNames.price+'"], input[name="'+this.settings.fieldNames.promotionalPrice+'"]'),this.$cprSlideouts=this.$container.find(".js-cpr-slideout"),this.$priceFields.on("change",(function(i){e.updatePriceList()})),this.$cprSlideouts.on("click",(function(i){i.preventDefault();var t=$(this),n={storeId:t.data("store-id"),storeHandle:t.data("store-handle")};t.data("catalog-pricing-rule-id")?n.id=t.data("catalog-pricing-rule-id"):(n.purchasableId=t.data("purchasable-id"),n.name=e.settings.catalogPricingRuleTempName),new Craft.CpScreenSlideout("commerce/catalog-pricing-rules/edit",{params:n}).on("submit",(function(i){i.response,i.data,e.updatePriceList()}))}))}})}();
//# sourceMappingURL=purchasablepricefield.js.map