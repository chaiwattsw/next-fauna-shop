import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import ProductList from "../components/ProductList";

const GET_PRODUCT = gql`
  query {
    getAllProducts {
      data {
        _id
        name
        description
        price
        imageUrl
        shop {
          _id
        }
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_PRODUCT);

  if (loading) return <div>Loading...</div>;

  return <ProductList products={data.getAllProducts.data} />;
};

export default Home;
