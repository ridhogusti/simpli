<template>
	<div>
		<div class="title">
			{{ Title }}
		</div>
		<br>
		<v-card v-if="!hiddenComponentPO" class="retangle1">
			<v-card-text>
				<br>
				<v-layout row wrap>
					<v-flex xs3> </v-flex>
					<v-flex xs1>
						<v-subheader class="subheader1">Purchase Order</v-subheader>
					</v-flex>
					<v-flex xs4>
						<v-select :readonly="modereadonly" :menu-props="{contentClass:'listPurchase'}" class="select1" label="Nama Supplier" @change="() => {myFunctionGR(), setDueDate()}" :items="PurchaseOrder" item-value="Id" solo append-icon="expand_more" item-text="InvoiceNo"
						  v-model="Purchase['ReferenceNoPo']">
						</v-select>
					</v-flex>
					<v-flex xs3> </v-flex>
				</v-layout>
	
				<v-layout align-center justify-center row wrap>
					<v-flex xs1>
						<v-subheader class="subheader1">GR</v-subheader>
					</v-flex>
					<v-flex v-if="GrinPo != null" v-for="(item) in GrinPo" :key="item.id" lg2>
						<v-checkbox v-model="Purchase['selectedGR']" :label="item.GoodsReceiptNo" :value="item.GoodsReceiptNo"></v-checkbox>
					</v-flex>
					<div v-if="GrinPo.length == 0">
						Tidak ada Goods Receipt
					</div>
					<!-- {{ selectedGR }} -->
				</v-layout>
				<v-layout justify-center row wrap>
					<v-btn @click="changeSelectGR" color="#6747cd" dark round>Apply</v-btn>
				</v-layout>
			</v-card-text>
			<br>
		</v-card>
	
		<br>
	
		<v-card class="retangle1">
			<v-card-text>
				<br>
				<v-layout row wrap>
					<v-flex xs3> </v-flex>
					<v-flex xs1>
						<v-subheader class="subheader1">Supplier</v-subheader>
					</v-flex>
					<v-flex xs4>
						<v-select :readonly="modereadonly || modereadonlyCreate" :menu-props="{contentClass:'listPurchase'}" class="select1" label="Nama Supplier" @change="() => {myFunctionSupplier(), setDueDate()}" :items="$store.state.supplier.suppliers" item-value="Id" solo
						  append-icon="expand_more" item-text="Company" v-model="Purchase['SupplierId']">
							<v-list-tile slot="prepend-item">
								<v-list-tile-content>
									<v-btn block @click="showDialogSupplier" class="btnadd" color="primary" outline dark>
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
						<v-subheader class="subheader1">Warehouse</v-subheader>
					</v-flex>
					<v-flex xs4>
						<v-select :readonly="modereadonly || modereadonlyCreate" text-xs-center :menu-props="{contentClass:'listPurchase'}" class="select1" label="Nama Warehouse" append-icon="expand_more" :items="$store.state.warehouse.warehouses" item-value="Id" solo item-text="Name"
						  v-model="Purchase['WarehouseId']">
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
				<v-layout justify-center row wrap>
					<v-flex xs2>
						<div class="text-xs-center label1">Invoice Number</div>
						<v-text-field :readonly="modereadonly || modereadonlyCreate" solo class="input1" value="-" v-model="Purchase['InvoiceNo']" type="text" :rules="true?[v => !!v || 'Invoice No' + ' is required.']:[]" :required="true"></v-text-field>
					</v-flex>
					<v-flex xs2>
						<div class="text-xs-center label1">Reference Number</div>
						<v-text-field :readonly="modereadonly || modereadonlyCreate" solo class="input1" value="-" v-model="Purchase['ReferenceNo']" type="text" :rules="true?[v => !!v || 'Reference No' + ' is required.']:[]" :required="true"></v-text-field>
					</v-flex>
	
					<v-flex xs2>
						<div class="label1 text-xs-center">Invoice Date</div>
						<v-menu ref="menusatu" :readonly="() => modereadonly, modereadonlyCreate" :close-on-content-click="false" v-model="menusatu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
							<v-text-field :readonly="modereadonly || modereadonlyCreate" solo class="input1" slot="activator" v-model="Purchase.Date" label="Date">
							</v-text-field>
							<!-- <v-date-picker ref="picker" v-model="Purchase.Date" min="1950-01-01" @change="()=>{saveDate(); setDueDate() }"></v-date-picker> -->
							<v-date-picker :readonly="modereadonly || modereadonlyCreate" prev-icon="chevron_left" next-icon="chevron_right" ref="picker" v-model="Purchase.Date" min="1950-01-01" @change="()=>{$refs.menusatu.save(Purchase.Date); setDueDate() }"></v-date-picker>
						</v-menu>
					</v-flex>
	
					<v-flex xs2>
						<div class="label1 text-xs-center">Payment Terms</div>
						<v-select :readonly="modereadonly || modereadonlyCreate" :menu-props="{contentClass:'listPurchase'}" text-xs-center class="select1" label="Payment Term" append-icon="expand_more" :items="$store.state.paymentterm.paymentterms" item-value="Id" solo item-text="Name"
						  v-model="Purchase['PaymentTermId']" v-on:change="() => {setDueDate()}">
							<v-list-tile slot="prepend-item">
								<v-list-tile-content>
									<v-btn block @click="showDialogPaymentTerm" class="btnadd" color="primary" outline dark>
										<v-icon dark>add_circle_outline</v-icon> &nbsp New</v-btn>
								</v-list-tile-content>
							</v-list-tile>
						</v-select>
					</v-flex>
					<v-flex xs2>
						<div class="label1 text-xs-center">Invoice Due Date</div>
						<v-menu :readonly="modereadonly || modereadonlyCreate" ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
							<v-text-field :readonly="modereadonly || modereadonlyCreate" solo slot="activator" class="input1" v-model="Purchase.DueDate"></v-text-field>
							<!-- <v-date-picker ref="picker" v-model="Purchase.DueDate" min="1950-01-01" @change="saveDueDate"></v-date-picker> -->
							<v-date-picker :readonly="modereadonly || modereadonlyCreate" ref="picker" v-model="Purchase.DueDate" min="1950-01-01" @change="$refs.menu.save(Purchase.DueDate)"></v-date-picker>
						</v-menu>
					</v-flex>
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
			'Purchase',
			'PurchaseOrder',
			'showDialogSupplier',
			'showDialogWarehouse',
			'showDialogPaymentTerm',
			'myFunctionSupplier',
			'myFunctionGR',
			'setDueDate',
			'menu',
			'saveDueDate',
			'menusatu',
			'saveDate',
			'Title',
			'modereadonly',
			'modereadonlyCreate',
			'selectedGR',
			'selectGR',
			'GrinPo',
			'changeSelectGR',
			'hiddenComponentPO'
		]
	};
</script>