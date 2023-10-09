import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { subjects } from "./eeic.js";

function QuestionForm() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [conditions, setConditions] = useState(
    Array(subjects.length).fill(false)
  );
  const [mustCredit, setMustCredit] = useState(0);
  const [semimustCredit, setSemimustCredit] = useState(0);
  const [seniorCredit, setSeniorCredit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [otherCredit, setOtherCredit] = useState(0);
  const [otherDepartmentCredit, setOtherDepartmentCredit] = useState(0);
  useEffect(() => {
    let newMustCredit = 0;
    let newSemimustCredit = 0;
    let newSeniorCredit = 0;
    let newTotalCredit = 0;
    for (let i = 0; i < subjects.length; i++) {
      if (conditions[i] === true) {
        newTotalCredit += subjects[i]["credit"];
        if (subjects[i][selectedCourse] === "◎") {
          newMustCredit += subjects[i]["credit"];
        } else if (subjects[i][selectedCourse] === "○") {
          newSemimustCredit += subjects[i]["credit"];
        } else if (subjects[i][selectedCourse] === "Ⓐ") {
          newSeniorCredit += subjects[i]["credit"];
        }
      }
    }
    newTotalCredit += parseFloat(otherCredit);
    newTotalCredit += Math.min(10, parseFloat(otherDepartmentCredit));
    setMustCredit(newMustCredit);
    setSemimustCredit(newSemimustCredit);
    setSeniorCredit(newSeniorCredit);
    setTotalCredit(newTotalCredit);
  }, [conditions, selectedCourse, otherCredit, otherDepartmentCredit]);
  return (
    <>
      <Form>
        <Form.Group controlId="courseSelect">
          <Form.Label>コース</Form.Label>
          <Form.Select onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">選択してください</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="AS">AS</option>
            <option value="BS">BS</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <div>
        <Form>
          <Form.Group controlId="questionSelect">
            <Form.Label>単位取得状況</Form.Label>
            <Table borderless responsive>
              <thead>
                <tr>
                  <th>履修</th>
                  <th>科目名</th>
                  <th>単位数</th>
                  <th className={selectedCourse === "A1" ? "table-info" : ""}>
                    A1
                  </th>
                  <th className={selectedCourse === "A2" ? "table-info" : ""}>
                    A2
                  </th>
                  <th className={selectedCourse === "AS" ? "table-info" : ""}>
                    AS
                  </th>
                  <th className={selectedCourse === "BS" ? "table-info" : ""}>
                    BS
                  </th>
                  <th className={selectedCourse === "B1" ? "table-info" : ""}>
                    B1
                  </th>
                  <th className={selectedCourse === "B2" ? "table-info" : ""}>
                    B2
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr className={conditions[index] ? "table-success" : ""}>
                    <td>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={conditions[index]}
                        onChange={(e) => {
                          let newConditions = [...conditions];
                          newConditions[index] = e.target.checked;
                          setConditions(newConditions);
                        }}
                      />
                    </td>
                    <td>{subject["name"]}</td>
                    <td>{subject["credit"]}</td>
                    <td className={selectedCourse === "A1" ? "table-info" : ""}>
                      {subject["A1"]}
                    </td>
                    <td className={selectedCourse === "A2" ? "table-info" : ""}>
                      {subject["A2"]}
                    </td>
                    <td className={selectedCourse === "AS" ? "table-info" : ""}>
                      {subject["AS"]}
                    </td>
                    <td className={selectedCourse === "BS" ? "table-info" : ""}>
                      {subject["BS"]}
                    </td>
                    <td className={selectedCourse === "B1" ? "table-info" : ""}>
                      {subject["B1"]}
                    </td>
                    <td className={selectedCourse === "B2" ? "table-info" : ""}>
                      {subject["B2"]}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2}>その他工学部の単位</td>
                  <td colSpan={7}>
                    <Form.Control
                      type="number"
                      id="otherCredit"
                      value={otherCredit}
                      onChange={(e) => {
                        if (e.target.value < 0) e.target.value = 0;
                        setOtherCredit(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>他学科の単位 (10単位まで卒業単位に参入)</td>
                  <td colSpan={7}>
                    <Form.Control
                      type="number"
                      id="otherCredit"
                      value={otherDepartmentCredit}
                      onChange={(e) => {
                        if (e.target.value < 0) e.target.value = 0;
                        setOtherDepartmentCredit(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form.Group>
        </Form>
      </div>
      <div>
        <Table borderless>
          <tbody>
            <tr>
              <td>総単位数</td>
              <td>{totalCredit}</td>
            </tr>
            <tr>
              <td>必修単位数</td>
              <td>
                {!selectedCourse ? "コースを選択してください" : mustCredit}
              </td>
            </tr>
            <tr>
              <td>限定選択単位数</td>
              <td>
                {!selectedCourse ? "コースを選択してください" : semimustCredit}
              </td>
            </tr>
            <tr>
              <td>4年次限定選択単位数</td>
              <td>
                {!selectedCourse ? "コースを選択してください" : seniorCredit}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div>
        <Table borderless>
          <tbody>
            <tr>
              <td>3年時までの必修単位をすべて取得しているか</td>
              {mustCredit >= 25 ? (
                <td className="table-success">YES</td>
              ) : (
                <td className="table-danger">あと{25 - mustCredit}単位</td>
              )}
            </tr>
            <tr>
              <td>必修単位以外に43単位以上取得しているか</td>
              {totalCredit - mustCredit >= 43 ? (
                <td className="table-success">YES</td>
              ) : (
                <td className="table-danger">
                  あと{43 - totalCredit + mustCredit}単位
                </td>
              )}
            </tr>
            <tr>
              <td>必修単位以外に54単位以上取得しているか</td>
              {totalCredit - mustCredit >= 54 ? (
                <td className="table-success">YES</td>
              ) : (
                <td className="table-warning">
                  あと{54 - totalCredit + mustCredit}単位
                </td>
              )}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <b>研究室配属</b>
              </td>
              {mustCredit >= 25 && totalCredit - mustCredit >= 43 ? (
                <td className="table-success">
                  <b>可能</b>
                </td>
              ) : (
                <td className="table-danger">
                  <b>不可</b>
                </td>
              )}
            </tr>
          </tfoot>
        </Table>
        <Table borderless>
          <tbody>
            <tr>
              <td>必修単位をすべて取得しているか</td>
              {mustCredit >= 37 ? (
                <td className="table-success">YES</td>
              ) : (
                <td className="table-danger">あと{37 - mustCredit}単位</td>
              )}
            </tr>
            <tr>
              <td>2・3年向けの限定選択科目を32単位以上取得しているか</td>
              {semimustCredit >= 32 ? (
                <td className="table-success">YES</td>
              ) : (
                <td className="table-danger">あと{32 - semimustCredit}単位</td>
              )}
            </tr>
            <tr>
              <td>4年生向けの限定選択科目を4単位以上取得しているか</td>
              {seniorCredit >= 4 ? (
                <td className="table-success">YES</td>
              ) : (
                <td className="table-danger">あと{4 - seniorCredit}単位</td>
              )}
            </tr>
            <tr>
              <td>総取得単位が95単位以上か</td>
              {totalCredit >= 95 ? (
                <td className="table-success">YES</td>
              ) : (
                <td className="table-danger">あと{95 - totalCredit}単位</td>
              )}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <b>卒業</b>
              </td>
              {mustCredit >= 37 &&
              semimustCredit >= 32 &&
              seniorCredit >= 4 &&
              totalCredit >= 95 ? (
                <td className="table-success">
                  <b>可能</b>
                </td>
              ) : (
                <td className="table-danger">
                  <b>不可</b>
                </td>
              )}
            </tr>
          </tfoot>
        </Table>
      </div>
    </>
  );
}

export function CreditValidation() {
  return (
    <div>
      <h2>研究室振り分け・卒業要件チェッカー</h2>
      <p>
        このページでは、EEICの研究室振り分けと卒業要件を満たしているかチェックすることができます。
        データは手入力のため、誤っている可能性があります。出力された結果に対しては一切の責任を負いません。
      </p>
      <QuestionForm />
    </div>
  );
}
