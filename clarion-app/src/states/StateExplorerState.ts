import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contract, StacksContractInterface } from "../types";
import { RootState } from "../stores/root";

export interface StateExplorerState {
  contractsIdentifiers: Array<string>;
  contracts: Map<string, StacksContractInterface>;
  activeContractIdentifier?: string;
  activeField?: string;
}

const initialState: StateExplorerState = {
  contractsIdentifiers: [],
  contracts: new Map(),
  activeContractIdentifier: undefined,
  activeField: undefined,
};

export const stateExplorerSlice = createSlice({
  name: "stateExplorer",
  initialState,
  reducers: {
    activateField: (
      state: StateExplorerState,
      action: PayloadAction<string>
    ) => {
      state.activeField = action.payload;
    },
    updateContracts: (
      state: StateExplorerState,
      action: PayloadAction<Array<Contract>>
    ) => {
      state.contractsIdentifiers = [];
      state.contracts = new Map();
      for (const contract of action.payload) {
        state.contracts.set(contract.contract_identifier, contract.interface);
        state.contractsIdentifiers.push(contract.contract_identifier);
      }
    },
  },
});

export const { activateField, updateContracts } = stateExplorerSlice.actions;

export const selectContracts = (state: RootState) =>
  state.stateExplorer.contracts;

export const selectContractsIdentifiers = (state: RootState) =>
  state.stateExplorer.contractsIdentifiers;

export default stateExplorerSlice.reducer;