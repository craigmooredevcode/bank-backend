import React, { Component } from "react";
import styled from 'styled-components';
import MyAreaChart from '../Charts/MyAreaChart';
import Income from "./Income";
import Expense from "./Expense";

export default class Dashboard extends Component {
  render() {
    return (
          <PanelWrapper>
                <MyAreaChart/>
              <div className="row justify-content-between mt-5">
                <div className="col-md-6">
                  <Income />
                </div>
                <div className="col-md-6">
                  <Expense />
                </div>
              </div>
          </PanelWrapper>
    );
  }
}

const PanelWrapper = styled.div`
  // overflow-x: hidden;
  margin-top: 75px
  width: 85%;
  background-color: #2f353a;
  font-family: 'DM Sans', sans-serif;
`;