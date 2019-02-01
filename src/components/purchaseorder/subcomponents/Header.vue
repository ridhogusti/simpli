<template>
	<div>
		<div class="title">
			{{ Title }}
		</div>
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
						<v-select :readonly="modereadonly" :menu-props="{contentClass:'listPurchase'}" class="select1" label="Nama Supplier" @change="() => {myFunctionSupplier(), setDueDate()}" :items="$store.state.supplier.suppliers" item-value="Id" solo append-icon="expand_more"
						  item-text="Company" v-model="PurchaseOrder['SupplierId']">
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
						<v-select :readonly="modereadonly" text-xs-center :menu-props="{contentClass:'listPurchase'}" class="select1" label="Nama Warehouse" append-icon="expand_more" :items="$store.state.warehouse.warehouses" item-value="Id" solo item-text="Name" v-model="PurchaseOrder['WarehouseId']">
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
							<v-flex xs2>
								<div class="text-xs-center label1">PO Number</div>
								<v-text-field :readonly="modereadonly" solo class="input1" value="-" v-model="PurchaseOrder['InvoiceNo']" type="text" :rules="true?[v => !!v || 'Invoice No' + ' is required.']:[]" :required="true"></v-text-field>
							</v-flex>
	
							<v-flex xs3>
								<div class="label1 text-xs-center">Invoice Date</div>
								<v-menu ref="menusatu" :readonly="modereadonly" :close-on-content-click="false" v-model="menusatu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
									<v-text-field :readonly="modereadonly" solo class="input1" slot="activator" v-model="PurchaseOrder.Date" label="Date" readonly>
									</v-text-field>
									<!-- <v-date-picker ref="picker" v-model="PurchaseOrder.Date" min="1950-01-01" @change="()=>{saveDate(); setDueDate() }"></v-date-picker> -->
									<v-date-picker :readonly="modereadonly" prev-icon="chevron_left" next-icon="chevron_right" ref="picker" v-model="PurchaseOrder.Date" min="1950-01-01" @change="()=>{$refs.menusatu.save(PurchaseOrder.Date); setDueDate() }"></v-date-picker>
								</v-menu>
							</v-flex>
	
							<v-flex xs4>
								<div class="label1 text-xs-center">Payment Terms</div>
								<v-select :readonly="modereadonly" :menu-props="{contentClass:'listPurchase'}" text-xs-center class="select1" label="Payment Term" append-icon="expand_more" :items="$store.state.paymentterm.paymentterms" item-value="Id" solo item-text="Name" v-model="PurchaseOrder['PaymentTermId']"
								  v-on:change="() => {setDueDate()}">
									<v-list-tile slot="prepend-item">
										<v-list-tile-content>
											<v-btn block @click="showDialogPaymentTerm" class="btnadd" color="primary" outline dark>
												<v-icon dark>add_circle_outline</v-icon> &nbsp New</v-btn>
										</v-list-tile-content>
									</v-list-tile>
								</v-select>
							</v-flex>
							<v-flex xs3>
								<div class="label1 text-xs-center">Invoice Due Date</div>
								<v-menu :readonly="modereadonly" ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
									<v-text-field :readonly="modereadonly" solo slot="activator" class="input1" v-model="PurchaseOrder.DueDate"></v-text-field>
									<!-- <v-date-picker ref="picker" v-model="PurchaseOrder.DueDate" min="1950-01-01" @change="saveDueDate"></v-date-picker> -->
									<v-date-picker :readonly="modereadonly" ref="picker" v-model="PurchaseOrder.DueDate" min="1950-01-01" @change="$refs.menu.save(PurchaseOrder.DueDate)"></v-date-picker>
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
			'PurchaseOrder',
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
			'modereadonly'
		]
	};
</script>