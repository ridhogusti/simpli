<template>
	<div>
	
	
		<div class="title">
			{{ Title }}
		</div>
		<br>
		<v-card class="retangle1">
			<v-card-text>
				<br>
				<v-layout justify-center row wrap>
					<v-flex xs2>
						<v-subheader class="subheader1">Warehouse</v-subheader>
					</v-flex>
					<v-flex xs4>
						<v-select @change="() => getProduct()" :readonly="modereadonly" text-xs-center :menu-props="{contentClass:'listPurchase'}" class="select1" label="Nama Warehouse" append-icon="expand_more" :items="Warehouse" item-value="Id" solo item-text="Name" v-model="StockAdjustment['WarehouseId']">
							<v-list-tile slot="prepend-item">
								<v-list-tile-content>
									<v-btn block @click="showDialogWarehouse" class="btnadd" color="primary" outline dark>
										<v-icon dark>add_circle_outline</v-icon> &nbsp New</v-btn>
								</v-list-tile-content>
							</v-list-tile>
						</v-select>
					</v-flex>
				</v-layout>

				<v-layout justify-center row wrap>
					<v-flex xs2>
						<v-subheader class="subheader1">SA Number</v-subheader>
					</v-flex>
					<v-flex lg4>
						<v-text-field 
						:readonly="modereadonly" 
						solo class="input1" 
						value="-" 
						v-model="StockAdjustment['StockAdjustmentNo']" 
						type="text"></v-text-field>
					</v-flex>
				</v-layout>
			</v-card-text>
			</v-card>
	</div>
</template>

<style src="../../../assets/css/style.css">
	
</style>

<script>
	import FormDialogSupllier from '@/components/supplier/FormDialog'
	import FormDialogWarehouse from '@/components/warehouse/FormDialog'
	export default {
		props: [
			'StockAdjustment',
			'showDialogSupplier',
			'showDialogWarehouse',
			'showDialogPaymentTerm',
			'myFunctionSupplier',
			'setDueDate',
			'menu',
			'saveDueDate',
			'menusatu',
			'saveDate',
			'Title',
			'modereadonly',
			'getProduct',
			'Warehouse'
		]
	};
</script>