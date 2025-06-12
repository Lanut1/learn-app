#!/bin/bash

ENDPOINT_URL="http://localhost:8000"
PROFILE="local"

echo "Attempting to create UsersTable..."
aws dynamodb create-table \
    --table-name UsersTable \
    --attribute-definitions \
        AttributeName=pk,AttributeType=S \
        AttributeName=sk,AttributeType=S \
        AttributeName=email,AttributeType=S \
        AttributeName=role,AttributeType=S \
    --key-schema \
        AttributeName=pk,KeyType=HASH \
        AttributeName=sk,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"EmailIndex\",
                \"KeySchema\": [
                    {\"AttributeName\":\"email\", \"KeyType\":\"HASH\"}
                ],
                \"Projection\": {
                    \"ProjectionType\":\"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 5,
                    \"WriteCapacityUnits\": 5
                }
            },
            {
                \"IndexName\": \"RoleIndex\",
                \"KeySchema\": [
                    {\"AttributeName\":\"role\", \"KeyType\":\"HASH\"},
                    {\"AttributeName\":\"pk\", \"KeyType\":\"RANGE\"}
                ],
                \"Projection\": {
                    \"ProjectionType\":\"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 5,
                    \"WriteCapacityUnits\": 5
                }
            }
        ]" \
    --endpoint-url $ENDPOINT_URL --profile $PROFILE
echo "UsersTable creation command sent."

echo "Attempting to create StudentTrainerLinksTable..."
aws dynamodb create-table \
    --table-name StudentTrainerLinksTable \
    --attribute-definitions \
        AttributeName=pk,AttributeType=S \
        AttributeName=sk,AttributeType=S \
        AttributeName=gsi1pk,AttributeType=S \
        AttributeName=gsi1sk,AttributeType=S \
    --key-schema \
        AttributeName=pk,KeyType=HASH \
        AttributeName=sk,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"TrainerStudentsIndex\",
                \"KeySchema\": [
                    {\"AttributeName\":\"gsi1pk\", \"KeyType\":\"HASH\"},
                    {\"AttributeName\":\"gsi1sk\", \"KeyType\":\"RANGE\"}
                ],
                \"Projection\": {
                    \"ProjectionType\":\"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 5,
                    \"WriteCapacityUnits\": 5
                }
            }
        ]" \
    --endpoint-url $ENDPOINT_URL --profile $PROFILE
echo "StudentTrainerLinksTable creation command sent."

echo "Attempting to create TrainingsTable..."
aws dynamodb create-table \
    --table-name TrainingsTable \
    --attribute-definitions \
        AttributeName=pk,AttributeType=S \
        AttributeName=sk,AttributeType=S \
        AttributeName=gsi1pk,AttributeType=S \
        AttributeName=gsi1sk,AttributeType=S \
        AttributeName=gsi2pk,AttributeType=S \
        AttributeName=gsi2sk,AttributeType=S \
    --key-schema \
        AttributeName=pk,KeyType=HASH \
        AttributeName=sk,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"TrainerTrainingsIndex\",
                \"KeySchema\": [
                    {\"AttributeName\":\"gsi1pk\", \"KeyType\":\"HASH\"},
                    {\"AttributeName\":\"gsi1sk\", \"KeyType\":\"RANGE\"}
                ],
                \"Projection\": {
                    \"ProjectionType\":\"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 5,
                    \"WriteCapacityUnits\": 5
                }
            },
            {
                \"IndexName\": \"StudentTrainingsIndex\",
                \"KeySchema\": [
                    {\"AttributeName\":\"gsi2pk\", \"KeyType\":\"HASH\"},
                    {\"AttributeName\":\"gsi2sk\", \"KeyType\":\"RANGE\"}
                ],
                \"Projection\": {
                    \"ProjectionType\":\"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 5,
                    \"WriteCapacityUnits\": 5
                }
            }
        ]" \
    --endpoint-url $ENDPOINT_URL --profile $PROFILE
echo "TrainingsTable creation command sent."

echo "Waiting a few seconds for tables to be created..."
sleep 10

echo "Listing tables to verify:"
aws dynamodb list-tables --endpoint-url $ENDPOINT_URL --profile $PROFILE
