<template>
	<div>
		<div class="title">
			LIST ITEM
		</div>
		<br>
		<v-card class="retangle1">
			<v-card-text>
				<v-data-table :headers="headers" :items="Purchase.ListPurchaseItem" hide-actions class="elevation-1 tablePurchase">
					<tr slot="items" slot-scope="props" style="background-color: !important">
						<td class="text-xs-right">
							{{ props.index + 1 }}
						</td>
						<td style="width: 300px !important; padding: 0px 10px !important;">
							<v-select :readonly="modereadonly || modereadonlyCreate" :menu-props="{contentClass: 'listPurchase'}" class="select1" solo :items="productUnit" v-model="Purchase['ListPurchaseItem'][props.index].ProductUnitId" append-icon="expand_more" item-text="Name" v-on:change="myFunction(props.index)"
							  autocomplete item-value="Id">
								<tr slot="item" slot-scope="data">
	
									<v-list-tile-content>
										<v-list-tile-title v-html="data.item.Name"></v-list-tile-title>
										<v-list-tile-title v-html="data.item.Description"></v-list-tile-title>
										<!-- <v-list-tile-title v-html="data.item.PriceListItem.Price"></v-list-tile-title> -->
									</v-list-tile-content>
								</tr>
							</v-select>
							<!-- <v-autocomplete :readonly="modereadonly" :menu-props="{contentClass: 'listPurchase'}" class="select1" solo :items="$store.state.product.products" v-model="Purchase['ListPurchaseitem'][props.index].ProductId"  item-value="Id" item-text="Name"  append-icon="expand_more" v-on:change="myFunction(props.index)"  persistent-hint>
									
								</v-autocomplete> -->
						</td>
	
						<td style="width: 170px !important; padding: 0px 10px !important">
							<v-text-field :readonly="modereadonly || modereadonlyCreate" class="input2" solo :value="Purchase['ListPurchaseItem'][props.index].ProductDescription" v-model="Purchase['ListPurchaseItem'][props.index].ProductDescription" name="description" id="description"></v-text-field>
						</td>
						<td style="width: 146px !important; padding: 0px 10px !important">
							<v-text-field :readonly="modereadonly" class="input2 inputNumber" solo :value="Purchase['ListPurchaseItem'][props.index].ProductPrice" v-model="Purchase['ListPurchaseItem'][props.index].ProductPrice" name="price" id="price"></v-text-field>
						</td>
						<td style="width: 146px !important; padding: 0px 10px !important" class="text-xs-right">
							<v-text-field :readonly="modereadonly || modereadonlyCreate" class="input2 inputNumber" solo :value="Purchase['ListPurchaseItem'][props.index].Quantity" v-model="Purchase['ListPurchaseItem'][props.index].Quantity" name="quantity" id="quantity"></v-text-field>
						</td>
						<td style="width: 146px !important; padding: 0px 10px !important;">
							<v-layout justify-center row wrap >
								<v-flex xs6>
									<v-text-field :readonly="modereadonly" class="input2 inputNumber" solo v-if="Purchase['ListPurchaseItem'][props.index].TipeDiscount == 'amount'" :value="Purchase['ListPurchaseItem'][props.index].DiscountAmount" v-model="Purchase['ListPurchaseItem'][props.index].DiscountAmount"
									  name="discountAmount"></v-text-field>
									<v-text-field :readonly="modereadonly" class="input2 inputNumber" solo v-else-if="Purchase['ListPurchaseItem'][props.index].TipeDiscount == 'percentage'" :value="Purchase['ListPurchaseItem'][props.index].DiscountPercentage" v-model="Purchase['ListPurchaseItem'][props.index].DiscountPercentage"
									  name="discountPercentage"></v-text-field>
								</v-flex>
								<!-- <v-flex xs5> -->
									<!-- <v-btn-toggle :disabled="modereadonly" class="btnToggle" style="margin: 2px 10px ;border-radius: 15px !important" v-model="Purchase['ListPurchaseItem'][props.index].ToggleDiscount" mandatory>
										<v-btn :disabled="modereadonly" style="text-transform: none; border-radius: 15px 0px 0px 15px !important; " flat v-on:click="changeTipeDiscount('amount', props.index)">
											Rp.
										</v-btn>
										<v-btn :disabled="modereadonly" style="text-transform: none; border-radius: 0px 15px 15px 0px !important; " flat v-on:click="changeTipeDiscount('percentage', props.index)">
											%
										</v-btn>
									</v-btn-toggle> -->
	
								<!-- </v-flex> -->
								<v-flex xs1>
									<div style="padding: 10px 10px !important" class="subheading">%</div>
							</v-flex>
							</v-layout>
						</td>
						<td style="padding: 10px 10px !important">
							<v-select :readonly="modereadonly" style="width: 110px !important;" class="select1" solo v-model="Purchase['ListPurchaseItem'][props.index].Tax" :items="$store.state.tax.taxs" append-icon="expand_more" item-text="Name" item-value="Name" :rules="true?[v => !!v || 'Tax' + ' is required.']:[]"
							  :required="true"></v-select>
						</td>
						<td class="text-xs-center" style="padding: 10px 10px !important">
							<div class="subheading">
								{{ formatPrice(lineTotal(props.index)) }}
							</div>
						</td>
						<td style="padding: 10px 10px !important" class="text-xs-center">
							<v-btn v-if="modereadonly || modereadonlyCreate" class="btndelete" fab small dark>
								<img src="../../../assets/img/delete-button-icon-putih.svg" alt="">
							</v-btn>
							<v-btn v-else @click="removeRow(props.index)" class="btndelete" fab small dark>
								<img src="../../../assets/img/delete-button-icon-putih.svg" alt="">
							</v-btn>
						</td>
					</tr>
				</v-data-table>
				<br>
				<div v-if="modereadonly || hiddenButtonAdd"> </div>
				<div v-else>
					<v-layout row wrap>
						<v-flex lg12>
							<v-btn block @click="addRow(Purchase.ListPurchaseItem.length)" class="btnadd" color="primary" outline dark>
								<v-icon dark>add_circle_outline</v-icon> &nbsp Add Item</v-btn>
						</v-flex>
					</v-layout>
				</div>
			</v-card-text>
		</v-card>
	</div>
</template>

<style>

	@import '../../../assets/css/style.css';
	/* @font-face {
		font-family: LouisGeorgeCafe;
		src: url(../../../assets/font/LouisGeorgeCafe.ttf) format("opentype");
	} */
	
	.title {
		font-family: LouisGeorgeCafe;
		font-size: 21px;
		font-weight: bold;
		font-style: normal;
		font-stretch: normal;
		line-height: normal;
		letter-spacing: normal;
		text-align: left;
		color: #6747cd;
	}
	
	.retangle1 {
		border-radius: 10px;
		background-color: #fefefe;
		box-shadow: 0px 5px 10px 0 rgba(212, 219, 238, 0.75);
	}
	
	
	/* .select1 {
													font-family: LouisGeorgeCafe;
													text-align: center !important;
													color: #6747cd !important;
													margin-left: 10px;
													border-radius: 20.5px !important;
													box-shadow: inset 0px 2px 6px 0 rgba(212, 219, 238, 0.75) !important;
													background-color: #fefefe;
													border: solid 1px #ebebeb;
												} */
	
	.btnnew {
		font-family: LouisGeorgeCafe;
		background-color: #1fcaaf !important;
	}
	
	.subheader1 {
		color: #6747cd !important;
	}
	
	.subheading {
		font-family: LouisGeorgeCafe;
	}
	
	
	/* .hr1 {
													margin: 0 36px;
													height: 1px;
													background-color: #f2f2f2 !important;
													box-shadow: 0px 1px 3px 0 rgba(212, 219, 238, 0.75) !important;
													-moz-box-shadow: 0px 1px 3px 0 rgba(212, 219, 238, 0.75) !important;
													-webkit-box-shadow: 0px 1px 3px 0 rgba(212, 219, 238, 0.75) !important;
												} */
	
	
	/* .btnadd {
													font-family: LouisGeorgeCafe;
													height: 60px;
													text-transform: none;
													border-radius: 10px;
													border: dashed 2px #6747cd !important;
													color: #6747cd !important;
													font-size: 21px !important;
													border-style: dashed !important;*/
	
	
	/*border-width: 2px !important;
												} */
	
	.btndelete {
		font-family: LouisGeorgeCafe;
		background-color: #d4dbee !important;
		color: #6747cd !important;
		padding: 10px 0px 0px 8px;
	}
</style>

<script>
	import FormDialogSupllier from '@/components/supplier/FormDialog'
	import FormDialogWarehouse from '@/components/warehouse/FormDialog'
	export default {
		props: [
			'Purchase',
			'Supplier',
			'showDialogSupplier',
			'showDialogWarehouse',
			'myFunctionSupplier',
			'setDueDate',
			'menu',
			'saveDueDate',
			'menu1',
			'saveDate',
			'headers',
			'formatPrice',
			'lineTotal',
			'myFunction',
			'changeTipeDiscount',
			'addRow',
			'removeRow',
			'modereadonly',
			'productUnit',
			'hiddenButtonAdd',
			'modereadonlyCreate'
		]
	};
</script>