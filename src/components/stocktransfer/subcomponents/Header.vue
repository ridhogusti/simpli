<template>
	<div>
	
	
		<div class="title">
			{{ Title }}
		</div>
		<br>
		<v-card class="retangle1">
			<v-card-text>
				
				<v-layout row wrap>
					<v-flex xs3> </v-flex>
					<v-flex xs1>
						<v-subheader class="subheader1">Warehouse Origin</v-subheader>
					</v-flex>
					<v-flex xs4>
						<v-select  @change="() => getProduct()" :readonly="modereadonly" text-xs-center :menu-props="{contentClass:'listPurchase'}" class="select1" label="Nama Warehouse" append-icon="expand_more" :items="$store.state.warehouse.warehouses" item-value="Id" solo item-text="Name" v-model="StockTransfer['WarehouseOriginId']">
							<v-list-tile slot="prepend-item">
								<v-list-tile-content>
									<v-btn block @click="showDialogWarehouse" class="btnadd" color="primary" outline dark>
										<v-icon dark>add_circle_outline</v-icon> &nbsp New</v-btn>
								</v-list-tile-content>
							</v-list-tile>
						</v-select>
					</v-flex>
					<v-flex xs3> </v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs3> </v-flex>
					<v-flex xs1>
						<v-subheader class="subheader1">Warehouse Destination</v-subheader>
					</v-flex>
					<v-flex xs4>
						<v-select :readonly="modereadonly" text-xs-center :menu-props="{contentClass:'listPurchase'}" class="select1" label="Nama Warehouse" append-icon="expand_more" :items="$store.state.warehouse.warehouses" item-value="Id" solo item-text="Name" v-model="StockTransfer['WarehouseDestinationId']">
							<v-list-tile slot="prepend-item">
								<v-list-tile-content>
									<v-btn block @click="showDialogWarehouse" class="btnadd" color="primary" outline dark>
										<v-icon dark>add_circle_outline</v-icon> &nbsp New</v-btn>
								</v-list-tile-content>
							</v-list-tile>
						</v-select>
					</v-flex>
					<v-flex xs3> </v-flex>
				</v-layout>
			</v-card-text>
			<br>
			<hr class="hr1">
			<br>
	
			<v-card-text>
				<v-layout row wrap>
					<v-flex xs2> </v-flex>
					<v-flex xs8>
						<v-layout row wrap>
							<v-flex xs6>
								<div class="text-xs-center label1">Stock Transfer Number</div>
								<v-text-field :readonly="modereadonly" solo class="input1" value="-" v-model="StockTransfer['StockTransferNo']" type="text" :rules="true?[v => !!v || 'Invoice No' + ' is required.']:[]" :required="true"></v-text-field>
							</v-flex>
	
							<v-flex xs6>
								<div class="label1 text-xs-center">Date</div>
								<v-menu ref="menusatu" :readonly="modereadonly" :close-on-content-click="false" v-model="menusatu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
									<v-text-field :readonly="modereadonly" solo class="input1" slot="activator" v-model="StockTransfer.Date" label="Date" readonly>
									</v-text-field>
									<!-- <v-date-picker ref="picker" v-model="StockTransfer.Date" min="1950-01-01" @change="()=>{saveDate(); setDueDate() }"></v-date-picker> -->
									<v-date-picker :readonly="modereadonly" prev-icon="chevron_left" next-icon="chevron_right" ref="picker" v-model="StockTransfer.Date" min="1950-01-01" @change="()=>{$refs.menusatu.save(StockTransfer.Date); setDueDate() }"></v-date-picker>
								</v-menu>
							</v-flex>
						</v-layout>
					</v-flex>
					<v-flex xs2> </v-flex>
				</v-layout>
			</v-card-text>
			<br>
		</v-card>
	</div>
</template>

<style src="../test.css">
	
</style>

<script>
	import FormDialogSupllier from '@/components/supplier/FormDialog'
	import FormDialogWarehouse from '@/components/warehouse/FormDialog'
	export default {
		props: [
			'StockTransfer',
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
			'getProduct'
		]
	};
</script>