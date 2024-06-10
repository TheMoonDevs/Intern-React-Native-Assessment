import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = (pizza) => {
    const existingPizza = cartItems.find((item) => item.id === pizza.id);
    if (existingPizza) {
      setCartItems(
        cartItems.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...pizza, quantity: 1 }]);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://private-anon-b26f96742a-pizzaapp.apiary-mock.com/restaurants/1/menu?category=Pizza&orderBy=rank"
    )
      .then((response) => response.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching pizzas:", error));
  }, []);

  const handleAddToCart = (pizza) => {
    addToCart(pizza);
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Pizza Listing</Text>
      {isLoading ? (
        <Text>Loading pizzas...</Text>
      ) : (
        <View>
          {pizzas.map((pizza) => (
            <View key={pizza.id}>
              <Text>{pizza.name}</Text>
              <Button
                title="View Details"
                onPress={() => setSelectedPizza(pizza)}
              />
              <Button
                title="Add to Cart"
                onPress={() => handleAddToCart(pizza)}
              />
            </View>
          ))}
        </View>
      )}
      {selectedPizza && (
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Details</Text>
          <Text>Name: {selectedPizza.name}</Text>
          <Text>Description: {selectedPizza.description}</Text>
          <Text>Price: {selectedPizza.price}</Text>
          <Button
            title="Close Details"
            onPress={() => setSelectedPizza(null)}
          />
        </View>
      )}
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
        <Text>Total Items: {cartItems.length}</Text>
        <View>
          {cartItems.map((item) => (
            <View key={item.id}>
              <Text>
                {item.name} - Quantity: {item.quantity}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default App;
