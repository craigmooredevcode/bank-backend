import React, { Component } from "react";
import styled from 'styled-components';
// import MyAreaChart from '../Charts/MyAreaChart';
import styles from './Dashboard.module.css';
import Income from "./Income";
import Expense from "./Expense";

export default class Dashboard extends Component {
  render() {
    return (
          <PanelWrapper>
                {/* <MyAreaChart/> */}
                <div className={styles.dashHero}>
                  <div style={{textAlign: 'center'}}>
                    <h2 style={{fontSize: '42px', fontWeight: 'bold'}}>Welcome to Prime Online Banking</h2>
                    <p style={{textAlign: 'center', fontSize: '20px'}} >We are dedicated to an awesome banking experience for you.</p>
                    <button className={styles.btn} style={{backgroundColor: '#008000', color: '#fff', padding: '10px 26px', border: 'none', borderRadius: '6px'}}>
                        <a className={styles.btnLink} href="https://primeonline.online">Visit our Homepage</a>
                    </button>
                  </div>
                </div>
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