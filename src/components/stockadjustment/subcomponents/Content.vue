<template>
	<div>
		<div class="title">
			LIST ITEM
		</div>
		<br>
		<v-card class="retangle1">
			<v-card-text>
				<v-data-table :headers="headers" :items="StockAdjustment.ListStockAdjustmentItem" hide-actions class="elevation-1 tablePurchase">
					<tr slot="items" slot-scope="props" style="background-color: !important">
						<td class="text-xs-right">
							{{ props.index + 1 }}
						</td>
						<td style="padding: 0px 10px !important;">
								<div class="subheading">
								{{ props.item.ProductUnitName }}
							</div>
						</td>
						<td style="padding: 0px 10px !important">
							<div class="subheading">
								{{ props.item.Price }}
							</div>
						</td>
						<td style="padding: 0px 10px !important" class="text-xs-center">
							<div class="subheading">
								{{ props.item.Quantity }}
							</div>
						</td>
						<td style="padding: 0px 10px !important;">
							<v-layout justify-center row wrap>
								<v-flex xs12>
									<v-text-field :readonly="modereadonly" :placeholder="props.item.UnitNameItem" class="input2 inputNumber" solo v-model="props.item.RealQuantity"
									  name="quantity"></v-text-field>
								</v-flex>
							</v-layout>
						</td>
						<td class="text-xs-center" style="padding: 0px 10px !important">
							<div class="subheading">
								{{ diff(props.index) }}
							</div>
						</td>	
						<td class="text-xs-center" style="padding: 10px 10px !important">
							<div class="subheading">
								{{ formatPrice(lineTotal(props.index)) }}
							</div>
						</td>
					</tr>
				</v-data-table>
				<br>
				<div v-if="modereadonly"> </div>
			</v-card-text>
		</v-card>
	</div>
</template>

<style>

	@import '../../../assets/css/style.css';
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
			'StockAdjustment',
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
			'diff',
			'product'
		]
	};
</script>