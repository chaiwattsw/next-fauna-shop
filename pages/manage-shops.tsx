import NewShopForm from "../components/NewShopForm";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import ShopList from "../components/ShopList";

const GET_SHOPS_BY_OWNER = gql`
  query getShopsByOwnerID($ownerID: String!) {
    getShopsByOwnerID(ownerID: $ownerID) {
      data {
        _id
        name
      }
    }
  }
`;

export default function ManageShops({ accessToken }: { accessToken: string }) {
  const { user } = useUser();
  const { data, error } = useQuery(GET_SHOPS_BY_OWNER, {
    variables: { ownerID: user?.sub },
  });
  console.log(data, error);
  return (
    <>
      <NewShopForm accessToken={accessToken} />
      {data ? (
        <ShopList
          shops={data.getShopsByOwnerID.data}
          accessToken={accessToken}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const { accessToken } = await getAccessToken(ctx.req, ctx.res);
  return {
    props: {
      accessToken,
    },
  };
}
