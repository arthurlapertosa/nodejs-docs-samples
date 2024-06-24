// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Demostrates deleting security marks on a finding.
 */
function main(findingName = 'full finding path to delete marks from') {
  // [START securitycenter_delete_security_marks_v2]
  // Imports the Google Cloud client library.
  const {SecurityCenterClient} = require('@google-cloud/security-center').v2;

  // Creates a new client.
  const client = new SecurityCenterClient();

  // findingName is the full resource path for the finding to update.
  /*
   * TODO(developer): Uncomment the following lines
   */
  // const findingName = `organizations/${organizationNumber}/sources/${sourceId}/locations/${location}/findings/${findingId}`
  const updateSecurityMarksRequest = {
    securityMarks: {
      name: `${findingName}/securityMarks`,
      // Intentionally, not setting marks to delete them.
    },
    // Only delete marks for the following keys.
    updateMask: {paths: ['marks.key_a', 'marks.key_b']},
  };

  async function deleteSecurityMarks() {
    const [newMarks] = await client.updateSecurityMarks(
      updateSecurityMarksRequest
    );

    console.log('Updated marks: %j', newMarks);
  }
  deleteSecurityMarks();
  // [END securitycenter_delete_security_marks_v2]
}

main(...process.argv.slice(2));
