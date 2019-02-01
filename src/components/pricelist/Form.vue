<template>
  <v-container class="body" fluid>
    <Header
    :PriceList="PriceList"
    :menu="menu"
    :menusatu="menusatu"
    :saveStartDate="saveStartDate"
    :Title="Title"
    />
    <Content
    :PriceList="PriceList"
    :headers="headers"
    :formatPrice="formatPrice"
    :setPriceListItem="setPriceListItem"
    :addRow="addRow"
    :removeRow="removeRow"
    />
    
    

    <FormDialogSupllier/>
    <FormDialogPaymentTerm/>
    <FormDialogWarehouse/>


  </v-container>
</template>

<style lang="css" src="../purchase/test.css">
.body {
  background-color: #f2f2f2;
}
</style>
<script>
import Header from "@/components/pricelist/subcomponents/Header";
import Content from "@/components/pricelist/subcomponents/Content";
import Footer from "@/components/pricelist/subcomponents/Footer";
import FormDialogSupllier from "@/components/supplier/FormDialog";
import moment from "moment";
import FormDialogPaymentTerm from "@/components/paymentterm/FormDialog";
import FormDialogWarehouse from "@/components/warehouse/FormDialog";
import {
  GET_PRODUCT,
  GET_SUPPLIER,
  GET_PAYMENTTERM,
  GET_PRODUCTS,
  GET_STATE_PRODUCTS
} from "../../store/actions.type.js";

export default {
  props: ["PriceList", "Retur", "Title"],
  components: {
    FormDialogSupllier,
    FormDialogPaymentTerm,
    FormDialogWarehouse,
    Header,
    Content,
    Footer
  },
  data() {
    return {
      test: "",
      subTotal: 0,
      TipeDiscount: "amount",
      toggle_discount: 0,
      grandTotal: 0,
      grandDiscount: 0,
      grandTax: 0,
      discountAmount: 0,
      discountPercentage: 0,
      date: null,
      menu: false,
      menusatu: false,
      headers: [
        {
          text: "No.",
          align: "center",
          sortable: false,
          value: "no"
        },
        {
          text: "Product",
          value: "product",
          align: "center"
        },
        {
          text: "Product Unit",
          value: "productunit",
          align: "center"
        },
        {
          text: "Price",
          value: "price",
          align: "center"
        },
        {
          text: "Member Price",
          value: "memberprice",
          align: "center"
        }
      ]
    };
  },
  computed: {
    itemsHeader() {
      return this.$store.state.pricelist.pricelist;
    },
    items() {
      return this.$store.state.pricelist.pricelist.ListPriceListItem;
    },
    testMoment: function() {
      return moment(new Date()).format("YYYY");
    }
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    setPriceListItem() {
      var self = this;
      setTimeout(function() {
        self.$store
          .dispatch(GET_PRODUCT, self.PriceList.ProductId)
          .then(response => {
            self.PriceList.ListPriceListItem = [];

            for (var i = 0; i < response.data.ListProductUnit.length; i++) {
              self.PriceList.ListPriceListItem.push({
                ProductId: response.data.Id,
                ProductName: response.data.Name,
                ProductUnitName: response.data.ListProductUnit[i].Name,
                ProductUnitId: response.data.ListProductUnit[i].Id,
                Price: 0,
                MemberPrice: 0
              });
            }
          })
          .catch(err => {
            console.log("gagal", err);
          });
      }, 10);
    },
    myFunctionSupplier() {
      var self = this;
      setTimeout(function() {
        self.$store
          .dispatch(GET_SUPPLIER, self.PriceList.SupplierId)
          .then(response => {
            self.PriceList.PaymentTermId =
              self.$store.state.supplier.supplier.PaymentTermId;
          })
          .catch(err => {
            console.log("gagal");
          });
      }, 10);
    },
    changeTipeDiscount(tipe, index) {
      console.log(tipe, index);
      console.log(
        this.PriceList.ListPriceListItem[index].ProductPrice *
          this.PriceList.ListPriceListItem[index].Quantity
      );
      this.PriceList.ListPriceListItem[index].DiscountAmount =
        this.PriceList.ListPriceListItem[index].ProductPrice *
        this.PriceList.ListPriceListItem[index].Quantity *
        (this.PriceList.ListPriceListItem[index].DiscountPercentage / 100);
      this.PriceList.ListPriceListItem[index].TipeDiscount = tipe;
    },
    changeTipeTax(tipe, index) {
      this.PriceList.ListPriceListItem[index].tipeTax = tipe;
    },

    saveStartDate(date) {
      console.log(this.$refs, "asnothu");
      this.$refs.menusatu.save(date);
    },

    showDialogSupplier() {
      this.$store.state.supplier.dialogState = true;
    },

    addRow: function(index) {
      try {
        this.PriceList.ListPriceListItem.splice(index + 1, 0, {
          TipeDiscount: "amount",
          ToggleDiscount: 0,
          ProductId: "",
          ProductName: "",
          ProductDescription: "",
          ProductPrice: 0,
          ProductQuantity: 0,
          DiscountAmount: 0,
          DiscountPercentage: 0,
          Tax: 0,
          LineTotal: 0,
          Quantity: 0
        });
      } catch (e) {
        console.log(e);
      }
    },
    removeRow: function(index) {
      this.PriceList.ListPriceListItem.splice(index, 1);
    }
  },
  async created() {
    // await this.$store.dispatch(GET_STATE_PRODUCTS).then(result => {
    //   console.log(result);
    // });
    // console.log(typeof this.PriceList.StartDate);
    // if (
    //   this.PriceList.StartDate !== "" ||
    //   (typeof this.PriceList.StartDate === undefined)
    // ) {
    //   this.PriceList.StartDate = moment(this.PriceList.StartDate).format(
    //     "YYYY-MM-DD"
    //   );
    // }
  }
};
</script>
