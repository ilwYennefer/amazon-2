import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { motion } from "framer-motion";

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 gap-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}

            {/* Display each item only once */}
            {/* {items
              .filter((item, i) => item.id === i + 1)
              .map((filteredItem, i) => (
                <CheckoutProduct
                  key={i}
                  id={filteredItem.id}
                  title={filteredItem.title}
                  rating={filteredItem.rating}
                  price={filteredItem.price}
                  description={filteredItem.description}
                  category={filteredItem.category}
                  image={filteredItem.image}
                  hasPrime={filteredItem.hasPrime}
                />
              ))} */}
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length}) items:{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="AED" />
                </span>
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{
                  scale: 0.95,
                  border: "none",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1.5 } }}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
                disabled={!session}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </motion.button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
