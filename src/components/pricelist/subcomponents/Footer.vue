<template>
	<v-container fluid>
		<v-layout row wrap>
			<v-flex xs6>
				<div class="title">
					NOTES
				</div>    
				<br>
				<textarea v-model="Purchase['Notes']" placeholder="enter notes..." class="notes"></textarea>
			</v-flex>
			<v-flex xs6>
				<v-card class="retangle1 text-xs-center">
					<v-card-text>
						<br>
						<div class="titlediscount">
							Add Discount Order
						</div>
						<v-layout row wrap>
							<v-flex xs3> </v-flex>
							<v-flex xs6 text-xs-center>
								<v-text-field style="margin: 0px !important" solo class="input1" v-if="Purchase.TipeDiscount == 'amount'" :value="Purchase.DiscountAmount"
								v-model="Purchase.DiscountAmount" name="discountAmount" label="enter the discount order amount..."
								id="discountAmount"></v-text-field>
								<v-text-field style="margin: 0px !important" solo class="input1" v-if="Purchase.TipeDiscount == 'percentage'" :value="Purchase.DiscountPercentage"
								v-model="Purchase.DiscountPercentage" name="discountPercentage" label="enter the discount order percentage"
								id="discountPercentage"></v-text-field>
							</v-flex>
							<v-flex xs3> </v-flex>
						</v-layout>
						<v-layout row wrap>
							<v-flex xs3> </v-flex>
							<v-flex xs6 :style="{ marginTop: '10px'}">
								<v-layout row wrap>
									<v-flex xs6>
										<v-badge color="purple" right overlap>
											<v-btn style="text-transform: none; background-color: #1fcaaf !important; margin: 0px" round color="primary" dark v-on:click="changeTipeDiscountGrand('amount')">Discount (Rp) </v-btn>
											<v-icon slot="badge"dark small v-if="Purchase.TipeDiscount == 'amount'" >done</v-icon>
										</v-badge>
									</v-flex>  
									<v-flex xs6>
										<v-badge color="purple" right overlap>
											<v-btn style="text-transform: none; background-color: #1fcaaf !important; margin: 0px" round color="primary" dark v-on:click="changeTipeDiscountGrand('percentage')">Discount (%) </v-btn>
											<v-icon slot="badge" v-if="Purchase.TipeDiscount == 'percentage'" dark small  >done</v-icon>
										</v-badge>
									</v-flex>
								</v-layout>
							</v-flex> 
							<v-flex xs3> </v-flex>
						</v-layout>
						<br>

					</v-card-text>
				</v-card>	  

				<br>

				<v-card class="retangle1">
					<br>
					<v-card-text>
						<v-layout class="label2" row wrap>
							<v-flex xs3> </v-flex>
							<v-flex xs3>
								<div>Sub Total</div>
								<div>Discount Order</div>
								<div>Total Tax</div>
							</v-flex>
							<v-flex xs3 text-xs-right>
								<div>
									{{ formatPrice(subTotall()) }}
								</div>
								<div>
									{{ formatPrice(grandDiscountt()) }}
								</div>
								<div>
									{{ formatPrice(grandTaxx()) }}
								</div>
							</v-flex>
							<v-flex xs3> </v-flex>
						</v-layout>
					</v-card-text>

					<v-layout row wrap>
						<v-flex xs3> </v-flex>
						<v-flex xs6> <hr class="hr2"> </v-flex>
						<v-flex xs3> </v-flex>
					</v-layout>

					<v-card-text>
						<v-layout row wrap>
							<v-flex xs3> </v-flex>
							<v-flex xs2>
								<div class="labeltotal">TOTAL</div>
							</v-flex>
							<v-flex xs4 text-xs-right>
								<div class="grandTotal">
									{{ formatPrice(grandTotall()) }}
								</div>
							</v-flex>
							<v-flex xs3> </v-flex>
						</v-layout>
					</v-card-text>
					<br>
				</v-card>
			</v-flex>
		</v-layout>
		<br>
		<hr class="hrfooter">
	</v-container>
</template>

<style scoped>

@font-face {
  font-family: LouisGeorgeCafe;
  src: url(../../../assets/font/LouisGeorgeCafe.ttf) format("opentype");
}
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
.retangle1{
	font-family: LouisGeorgeCafe;
	border-radius: 10px !important;
	background-color: #fefefe;
	box-shadow: 0px 5px 10px 0 rgba(212, 219, 238, 0.75) !important;
}
.label2 {
	font-family: LouisGeorgeCafe;
	font-size: 21px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: 1.43;
	letter-spacing: normal;
	text-align: left;
	color: #333333;
}

.input1 {
	font-family: LouisGeorgeCafe;
	border-radius: 20.5px !important;
	box-shadow: inset 0px 2px 6px 0 rgba(212, 219, 238, 0.75) !important;
	background-color: #fefefe !important;
	border: solid 1px #ebebeb !important;
	height: 41px !important;
	padding: 0px !important;
	text-align: center !important;
}
.hrfooter {
	height: 1px !important;
	border: 0px;
	background-color: #e6e6e6 !important;
	box-shadow: 0px 1px 3px 0 rgba(212, 219, 238, 0.75) !important;
}
.notes {
	font-family: LouisGeorgeCafe;
	font-size: 18px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: normal;
	letter-spacing: normal;
	color: #808080;

	height: 416px;
	width: 95%;
	padding: 30px;
	border-radius: 10px;
	box-shadow: inset 0px 2px 6px 0 rgba(212, 219, 238, 0.75);
	background-color: #f2f2f2;
	border: solid 1px #6747cd;
}
.titlediscount {
	font-family: LouisGeorgeCafe;
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
	color: #6747cd !important;
}
.grandTotal {
	font-size: 40px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: normal;
	letter-spacing: normal;
	color: #6747cd;
}
.labeltotal {
	font-family: LouisGeorgeCafe;
	font-size: 21px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: normal;
	letter-spacing: normal;
	text-align: left;
	color: #3f2984;
}
</style>
<script>	
import	FormDialogSupllier from '@/components/supplier/FormDialog'
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
	'changeTipeDiscountGrand',
	'formatPrice',
	'subTotall',
	'grandDiscountt',
	'grandTaxx',
	'grandTotall'
	]
};
</script>