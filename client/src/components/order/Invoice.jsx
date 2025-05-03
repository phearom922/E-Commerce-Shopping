import React from "react";
import brandLogo from "../../../public/Brand_Logo.png";
import moment from "moment";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

// Register font
import fontDev from "../order/Poppins-Regular.ttf";
import fontBold from "../order/Poppins-Bold.ttf";
Font.register({ family: "Poppins", src: fontDev });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Poppins",
    fontSize: 12,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  recipient: {
    fontSize: 12,
    marginBottom: 4,
  },
  status: {
    color: "red",
    fontSize: 12,
    marginTop: 10,
  },
  total: {
    textAlign: "right",
    marginTop: 10,
    fontWeight: "bold",
  },
  date: {
    textAlign: "right",
    fontSize: 12,
  },
  title: {
    fontSize: 24,
  },
  titleColor: {
    color: "#364153",
  },
  DescriptionFont: {
    fontSize: 10,
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  spaceY: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  table: {
    width: "100%",
    borderColor: "1px solid #f3f4f6",
    margin: "20px 0",
  },
  td: {
    padding: 4,
  },
  tableHeader: {
    backgroundColor: "#e5e5e5",
  },
  logSize: {
    width: "150px",
    objectFit: "cover",
  },
  textTotal: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
  },
  sectionPendingTop: {
    marginTop: 20,
  },
  displayTotal: {
    flexDirection: "column",
  },
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
            <Text>Invoice #INV-2024-0001</Text>
          </View>
          <View style={styles.spaceY}>
            <View style={styles.logSize}>
              <Image src={brandLogo} alt="logo" />
            </View>
            <Text style={styles.textBold}>CaboShoping</Text>
            <Text style={styles.DescriptionFont}>
              Borey New world ChhukVaII No. 118A, St.18,
            </Text>
            <Text style={styles.DescriptionFont}>
              S.K SomrongKroam, Pur SenChey, Phnom Penh.
            </Text>
          </View>
        </View>

        {/* Recipient */}
        <View style={styles.section}>
          <Text style={styles.recipient}>
            <Text>Recipient: </Text>
            <Text style={styles.textBold}>
              {order.shippingAddress.fullName}
            </Text>
          </Text>
          <Text style={[styles.recipient, styles.DescriptionFont]}>
            Phone Number : 0{order.shippingAddress.phoneNumber}
          </Text>
          <Text style={[styles.recipient, styles.DescriptionFont]}>
            Delivery Address : {order.shippingAddress.area}
          </Text>
          <Text style={[styles.recipient, styles.DescriptionFont]}>
            City : {order.shippingAddress.city}
          </Text>
        </View>

        {/* Product Table */}
        <Table data={order.products} style={styles.table}>
          <TableHeader>
            <TableCell>
              <Text style={[styles.td, styles.tableHeader, styles.textBold]}>
                Product Name
              </Text>
            </TableCell>
            <TableCell>
              <Text style={[styles.td, styles.tableHeader, styles.textBold]}>
                Quantity
              </Text>
            </TableCell>
            <TableCell>
              <Text style={[styles.td, styles.tableHeader, styles.textBold]}>
                Unit Price
              </Text>
            </TableCell>
            <TableCell>
              <Text style={[styles.td, styles.tableHeader, styles.textBold]}>
                Total
              </Text>
            </TableCell>
          </TableHeader>

          <TableBody>
            <DataTableCell
              getContent={(x) => x?.product?.title}
              style={[styles.td, styles.titleColor]}
            />
            <DataTableCell
              getContent={(x) => x.count}
              style={[styles.td, styles.titleColor]}
            />
            <DataTableCell
              getContent={(x) =>
                `$${(x.price - (x.price * x.discount) / 100).toFixed(2)}`
              }
              style={[styles.td, styles.titleColor]}
            />
            <DataTableCell
              getContent={(x) =>
                `$${((x.price - (x.price * x.discount) / 100) * x.count).toFixed(2)}`
              }
              style={[styles.td, styles.titleColor]}
            />
          </TableBody>
        </Table>

        {/* Status & Date */}
        

        <View style={styles.sectionPendingTop}>
          <Text>Date: {moment(order.createdAt).format("DD/MM/YYYY")}</Text>
          <Text style={styles.textTotal}>Total: ${order.cartTotal.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
