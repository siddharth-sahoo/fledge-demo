/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function generateBid(interestGroup, auctionSignals, perBuyerSignals, trustedBiddingSignals, browserSignals) {
  const [testAd] = interestGroup.ads;
  
  // privateAggregation.reportContributionsForEvent({
  //   eventType: 'reserved.loss', 
  //   contributions: {
  //     bucket: 12489523n,
  //     value: {
  //       baseValue: "winningBid",
  //       scale: 2, // Number which will be multiplied by browser value
  //       offset: -bid // Numbers which will be added to browser value, prior to scaling
  //     }
  //   }
  // });


  return {
    bid: 1, // Arbitrary bid value
    ad: {
      adName: testAd.metadata.adName,
    },
    render: testAd.renderUrl,
  };
}

// Generating an arbitrary aggregation key
function generateAggregationKey(signals) {
  return 123456n
}

function reportWin(auctionSignals, perBuyerSignals, sellerSignals, browserSignals, directFromSellerSignals) {
  const { interestGroupOwner } = browserSignals
  const signals = JSON.stringify({ auctionSignals, perBuyerSignals, sellerSignals, browserSignals, directFromSellerSignals })

  // Temporary auction result reporting
  sendReportTo(`${interestGroupOwner}/auction-results-report?signals=${signals}`);

  // Temporary event-level reporting
  registerAdBeacon({
    'hover': `${interestGroupOwner}/engagement-report?signals=${signals}`,
    'click': `${interestGroupOwner}/engagement-report?signals=${signals}`,
  });

  // Aggregate reporting 
  privateAggregation.sendHistogramReport({ bucket: generateAggregationKey(signals), value: 100 })
}
