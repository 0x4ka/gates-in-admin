import { myAppMetafieldNamespace } from "./constants.js";

const YOUR_FUNCTION_ID = "YOUR_FUNCTION_ID"; //todo In the last part of this tutorial series, after deploying your function to apply the gate discount, you'll come back to fill in YOUR_FUNCTION_ID.
console.log(`Loaded function id ${YOUR_FUNCTION_ID}`);

const CREATE_AUTOMATIC_DISCOUNT_MUTATION = `
  mutation CreateAutomaticDiscount($discount: DiscountAutomaticAppInput!) {
    discountCreate: discountAutomaticAppCreate(
      automaticAppDiscount: $discount
    ) {
      userErrors {
        code
        message
        field
      }
    }
  }
`;

export const createAutomaticDiscount = async (client, gateConfiguration) => {
  const response = await client.query({
    data: {
      query: CREATE_AUTOMATIC_DISCOUNT_MUTATION,
      variables: {
        discount: {
          title: gateConfiguration.name,
          functionId: YOUR_FUNCTION_ID,
          combinesWith: {
            productDiscounts: true,
            shippingDiscounts: true,
          },
          startsAt: new Date(),
          metafields: [
            {
              key: "gate_configuration_id",
              namespace: myAppMetafieldNamespace,
              type: "single_line_text_field",
              value: gateConfiguration.id
            }
          ]
        },
      },
    },
  });
};
