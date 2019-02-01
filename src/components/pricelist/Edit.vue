<template>
  <v-container class="body" fluid grid-list-md>

    <div v-if="alert.status">
      <v-alert v-model="alert.status" :type="alert.type" dismissible>
        {{alert.message}}
      </v-alert>
    </div>
    <v-layout row>
      <v-flex xs12 sm12>
          <v-card-text>
            <v-form ref="form">
              <FormPriceList :PriceList="pricelist" :Title="title"></FormPriceList>
              <div class="button-submit text-md-center">
                <v-btn class="primary" round :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="save"><v-icon left>save</v-icon> Save</v-btn>
                <v-btn class="error" round @click.native.stop="dialog = true"><v-icon left>delete</v-icon> Delete</v-btn>
                <!-- <v-btn class="primary" :loading="loadingBtnSave" :disabled="loadingBtnSave" @click.prevent="saveAndApprove"><v-icon left>save</v-icon> Save & Approve</v-btn> -->
              </div>
            </v-form>
          </v-card-text>
          <v-card-text class="text-xs-center pa-0 grey lighten-1">
            <v-btn :to="'/pricelist'">Back to list</v-btn>
          </v-card-text>
      </v-flex>
    </v-layout>
    <!-- dialog delete -->
    <div>
      <v-dialog v-model="dialog" :max-width="'290'">
        <v-card justify-center align-center>
          <v-card-text class="red">
            <div class="headline text-xs-center white--text">Are you sure?</div>
          </v-card-text>
          <hr class="devider">
          <v-card-text class="text-xs-center">
            This data will be deleted.
          </v-card-text>
          <v-card-actions>
            <v-btn color="" @click.native="dialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.native="deleted">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import FormPriceList from "@/components/pricelist/Form";
import {
  GET_PRICELIST,
  UPDATE_PRICELIST,
  DELETE_PRICELIST
} from "@/store/actions.type";

export default {
  components: {
    FormPriceList
  },
  props: ["id"],
  data() {
    return {
      edit: true,
      title: "EDIT PRICELIST",
      alert: {
        status: false,
        type: "success",
        message: ""
      },
      loadingBtnSave: false,
      dialog: false
      // pricelist: {
      //   ListPriceListItem: [{
      //     ProductName: '',
      //     ProductPrice: 0,
      //     ProductSKU: '',
      //     ProductDescription: '',
      //     tipeDiscount: 'amount',
      //     toggle_discount: 0,
      //     ProductId: '',
      //     description: '',
      //     price: 0,
      //     Quantity: 0,
      //     DiscountAmount: 0,
      //     DiscountPercentage: 0,
      //     Tax: '',
      //     LineTotal: 0
      //   }],
      //   DueDate: null,
      //   Date: null,
      //   Notes: '',
      //   TotalPriceList: 0,
      //   DiscountAmount: 0,
      //   DiscountPercentage: 0,
      //   SubTotal: 0,
      //   TaxAmount: 0,
      //   TaxPercentage: 0,
      //   Status: 'Active'
      // }
    };
  },
  computed: {
    pricelist() {
      return this.$store.state.pricelist.pricelist;
    }
  },
  // mounted() {
  //   this.$store.dispatch(GET_PRICELIST, this.id);
  // },
  methods: {
    deleted() {
      this.$store
        .dispatch(DELETE_PRICELIST, this.id)
        .then(response => {
          this.$router.push({ path: "/pricelist" });
        })
        .catch(err => {
          this.alert = {
            status: true,
            type: "error",
            message: err.message
          };
        });
    },
    save() {
      this.loadingBtnSave = true;
      this.$store
        .dispatch(UPDATE_PRICELIST, this.pricelist)
        .then(response => {
          this.loadingBtnSave = false;
          this.$router.push({ path: "/pricelist" });
        })
        .catch(err => {
          this.alert = {
            status: true,
            type: "error",
            message: err.message
          };
          this.loadingBtnSave = false;
        });
    }
  },
  async created() {
    await this.$store.dispatch(GET_PRICELIST, this.id);
    // console.log(moment(this.pricelist.StartDate).format("YYYY-MM-DD"));
    if (
      this.pricelist.StartDate !== "" ||
      typeof this.pricelist.StartDate === undefined
    ) {
      console.log("testuh aja bro");
      this.pricelist.StartDate = moment(this.pricelist.StartDate).format(
        "YYYY-MM-DD"
      );
    }
  }
};
</script>