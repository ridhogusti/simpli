<template>
	<div>
		<v-layout row wrap>
			<v-flex xs6>
				
				<div class="title">
					DESCRIPTION	
				</div>
	
				<br>
	
				<v-card class="retangle1">
					<v-card-text>
						<textarea :readonly="modereadonly" v-model="StockAdjustment['Description']" placeholder="add description..." class="notes"></textarea>
					</v-card-text>
				</v-card>
	
			</v-flex>
		</v-layout>
		<br>
	</div>
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
	
	.retangle1 {
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
		height: 145px;
		width: 95%;
		padding: 30px;
		border-radius: 10px;
		box-shadow: inset 0px 2px 6px 0 rgba(212, 219, 238, 0.75);
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
	import FormDialogSupllier from "@/components/supplier/FormDialog";
	import FormDialogWarehouse from "@/components/warehouse/FormDialog";
	export default {
		props: [
			"StockAdjustment",
			"Supplier",
			"showDialogSupplier",
			"showDialogWarehouse",
			"myFunctionSupplier",
			"setDueDate",
			"menu",
			"saveDueDate",
			"menu1",
			"saveDate",
			"changeTipeDiscountGrand",
			"formatPrice",
			"subTotall",
			"grandDiscountt",
			"grandTaxx",
			"grandTotall",
			"modereadonly"
		]
	};
</script>