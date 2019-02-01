<template>
	<v-container fluid>
		<div class="title">
			LIST ITEM
		</div>
		<br>
		<v-card class="retangle1">
			<v-card-text>

				<v-select :menu-props="{contentClass:'listPurchase'}" label="Select Product!!!" class="select1" solo :items="$store.state.product.products" v-model="PriceList.ProductId"
				append-icon="expand_more"
				item-text="Name" v-on:change="setPriceListItem()" item-value="Id" ></v-select>

				<br>

				<v-data-table :headers="headers" :items="PriceList.ListPriceListItem" hide-actions class="elevation-1 tablePurchase">
					<template slot="items" slot-scope="props" style="background-color: green !important">
						<td class="text-xs-center">
							{{ props.index + 1 }}
						</td>
						<td class="text-xs-center">
							{{ PriceList.ListPriceListItem[props.index].ProductName }}
						</td>
						<td class="text-xs-center">
							{{ PriceList.ListPriceListItem[props.index].ProductUnitName }}
						</td>
						<td style="padding: 0px 10px !important" class="text-xs-right">
							<v-text-field class="input2" solo :value="PriceList['ListPriceListItem'][props.index].Price"
							v-model="PriceList['ListPriceListItem'][props.index].Price" name="price"
							id="price"></v-text-field>
						</td>
						<td style="padding: 0px 10px !important" class="text-xs-right">
							<v-text-field class="input2" solo :value="PriceList['ListPriceListItem'][props.index].MemberPrice"
							v-model="PriceList['ListPriceListItem'][props.index].MemberPrice" name="memberprice"
							id="memberprice"></v-text-field>
						</td>
					</template>
				</v-data-table>
				<br>
			</v-card-text>
		</v-card>

	</v-container>
</template>

<style scr="../test.css">

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
.hr1 {
	margin: 0 36px;
	height: 1px;
	background-color: #f2f2f2 !important;
	box-shadow: 0px 1px 3px 0 rgba(212, 219, 238, 0.75) !important;
	-moz-box-shadow: 0px 1px 3px 0 rgba(212, 219, 238, 0.75) !important;
	-webkit-box-shadow: 0px 1px 3px 0 rgba(212, 219, 238, 0.75) !important;
}
.btnadd {
	font-family: LouisGeorgeCafe;
	height: 60px;
	text-transform: none;
	border-radius: 10px;
	border: dashed 2px #6747cd !important;
	color: #6747cd !important;
	font-size: 21px !important;
	/*border-style: dashed !important;*/
	/*border-width: 2px !important;*/
}
.btndelete {
	font-family: LouisGeorgeCafe;
	background-color: #d4dbee !important;
	color: #6747cd !important;
}
</style>
<script>	
export default {
	props: [
	'PriceList',
	'Supplier',
	'menu',
	'menu1',
	'headers',
	'formatPrice',
	'lineTotal',
	'setPriceListItem',
	'addRow',
	'removeRow',
	'saveStartDate'
	]
};
</script>