CREATE TABLE restaurants (
id BIGSERIAL NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
location VARCHAR(50) NOT NULL,
price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurants (id, name, location, price_range) values (123, 'zomato', 'gwalior', 4);

CREATE TABLE reviews (
id BIGSERIAL NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
review TEXT NOT NULL,
rating INT check(rating >= 1 and rating <= 5)
);


INSERT INTO reviews (id, name, review, rating) values (1, 'carl', 'very testy food', 4);


CREATE TABLE reviews (
id BIGSERIAL NOT NULL PRIMARY KEY,
restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
name VARCHAR(50) NOT NULL,
review TEXT NOT NULL,
rating INT NOT NULL check(rating >= 1 and rating <= 5)
);


INSERT INTO reviews (restaurant_id, name, review, rating) values (123, 'carl', 'very testy food', 4);


