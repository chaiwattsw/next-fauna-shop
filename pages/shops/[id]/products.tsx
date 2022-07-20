import { getAccessToken } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import ProductForm from "../../../components/NewProduct";

export default function ProductPage({ accessToken }: { accessToken: string }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <ProductForm shopId={id} accessToken={accessToken} />
    </div>
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
