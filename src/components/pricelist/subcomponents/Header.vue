<template>
	<v-container fluid>
	
		<div class="title">
			{{ Title }}
		</div>
		<br>
		<v-card class="retangle1">
			<br>

			<v-card-text>

				<v-layout row wrap>
					<v-flex xs2> </v-flex>
					<v-flex xs2>
						<v-subheader class="subheader1">Name</v-subheader>
					</v-flex>
					<v-flex xs4>
						<v-text-field solo class="input3" label="Name" value="-" v-model="PriceList['Name']" type="text" :rules="true?[v => !!v || 'Name' + ' is required.']:[]" :required="true"></v-text-field>
					</v-flex>
					<v-flex xs2> </v-flex>
				</v-layout>

				<v-layout row wrap>
					<v-flex xs2> </v-flex>
					<v-flex xs2>
						<v-subheader class="subheader1">Description</v-subheader>
					</v-flex>
					<v-flex xs4>
						<v-text-field solo class="input3" label="Description" value="-" v-model="PriceList['Description']" type="text" :rules="true?[v => !!v || 'Description' + ' is required.']:[]" :required="true"></v-text-field>
					</v-flex>
					<v-flex xs2> </v-flex>
				</v-layout>

				<v-layout row wrap>
					<v-flex xs2> </v-flex>
					<v-flex xs2>
						<v-subheader class="subheader1">Start Date</v-subheader>
					</v-flex>  
					<v-flex xs4>
						<v-menu ref="menusatu" :close-on-content-click="false" v-model="menusatu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
							<v-text-field solo class="input3" slot="activator" v-model="PriceList.StartDate" label="Date" required  :rules="true?[v => !!v || 'Start Date' + ' is required.']:[]" readonly>
							</v-text-field>
							<v-date-picker ref="picker" v-model="PriceList.StartDate" min="1950-01-01" @change="()=>{$refs.menusatu.save(PriceList.StartDate)}"></v-date-picker>
						</v-menu>
					</v-flex>
				</v-layout>
						
			</v-card-text>
			<br>
		</v-card>
	</v-container>
</template>

<style src="../../purchase/test.css" >
</style>

<script>	
export default {
	props: [
	'PriceList',
	'menu',
	'menusatu',
	'saveStartDate',
	'Title'
	]
};
</script>