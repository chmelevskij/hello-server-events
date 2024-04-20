#!/bin/bash

SECRETS_DIR=".secrets"
# Define variables for the output files
PRIV_KEY="$SECRETS_DIR/localhost-privkey.pem"
CSR="$SECRETS_DIR/localhost.csr"
CERT="$SECRETS_DIR/localhost-cert.pem"

# Generate a private key
openssl genrsa -out $PRIV_KEY 2048

# Create a certificate signing request (CSR)
openssl req -new -key $PRIV_KEY -out $CSR -subj "/CN=localhost"

# Generate a self-signed certificate from the CSR
openssl x509 -req -days 365 -in $CSR -signkey $PRIV_KEY -out $CERT

# Output the results and cleanup
echo "Generated the following files:"
echo "Private Key: $PRIV_KEY"
echo "CSR: $CSR"
echo "Certificate: $CERT"

# Optional: Remove CSR if not needed
rm $CSR
