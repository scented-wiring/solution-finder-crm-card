//This custom card is intended to be used with the "Companies" objectType within the CRM as defined in the fulfillment-card.json file.

// Beging by importing React and HubSpot defined react components.
import React, { useEffect, useState } from "react";
import { Text, EmptyState, Divider, hubspot, TableBody, TableCell, TableHead, TableRow, TableHeader, Table, Heading, } from "@hubspot/ui-extensions";
import { CrmActionButton } from '@hubspot/ui-extensions/crm';

// This code defines an extension for the HubSpot platform. The hubspot.extend() function takes an object that contains three parameters: "context", "runServerlessFunction", and "actions". It then returns an Extension React component that has the values for those 3 parameters.
hubspot.extend(({ context, runServerlessFunction, actions }) => 
  <Extension 
    context={context} 
    runServerless={runServerlessFunction} 
    fetchProperties={actions.fetchCrmObjectProperties} 
  />
);

// The Extension Component.
const Extension = ({ context, runServerless, fetchProperties }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [completedForm, setCompletedForm] = useState(false);
    const [numberOfEmployees, setNumberOfEmployees] = useState("");
    const [averageTransactionAmount, setAverageTransactionAmount] = useState(0);
    const [transactionsPerMonth, setTransactionsPerMonth] = useState(0);

    useEffect(() => {
        fetchProperties(["firstname", "lastname", "has_completed_solution_finder_form", "numemployees", "average_transaction_amount____", "average_number_of_transactions_per_month"])
          .then(properties => {
            setFirstName(properties.firstname);
            setLastName(properties.lastname);
            setCompletedForm(properties.has_completed_solution_finder_form);
            setNumberOfEmployees(properties.numemployees);
            setAverageTransactionAmount(properties.average_transaction_amount____);
            setTransactionsPerMonth(properties.average_number_of_transactions_per_month);
        });
    }, [fetchProperties]);


  if (completedForm) {
    return (
      <>

          <Heading>Solution finder answers for {firstName} {lastName}</Heading>

          <Divider />

          <Table bordered={true} paginated={false}>
            <TableHead>
              <TableRow>
                <TableHeader>Property</TableHeader>
                <TableHeader>Value</TableHeader>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>Number of employees</TableCell>
                <TableCell>{numberOfEmployees}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Average transaction amount</TableCell>
                <TableCell>{averageTransactionAmount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Average transactions per month</TableCell>
                <TableCell>{transactionsPerMonth}</TableCell>
              </TableRow>
            </TableBody>

          </Table>
      </>
    );
  } else {
    return (
      <>      
        <EmptyState title="No results" layout="vertical" imageWidth={100} reverseOrder={true}>
          <Text>This user has not filled out the Solutions Finder form</Text>
        </EmptyState>

        <Divider />

        <Text>To see an example of what this card looks like when the Solution Finder has been filled out, click the button below to go to an example record</Text>
        <CrmActionButton
          actionType="RECORD_APP_LINK"
          actionContext={{
            objectTypeId: "0-1",
            objectId: 4901,
            includeEschref: true
          }}
          variant="secondary"
        >
          Example record
        </CrmActionButton>
      </>
    )
  }
};