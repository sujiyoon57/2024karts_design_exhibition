import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

export default function Credit({ archiveNew }){
    return(
        <div className="credit">

            {/* ✅ org 데이터 구조를 모바일처럼 적용 */}
            {archiveNew?.org && (
                <div className="org-container">
                    {archiveNew.org.content.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="section">
                            {section.content.length === 1 ? (
                                <h4 className="section-title">
                                    {documentToReactComponents(section.content[0])}
                                </h4>
                            ) : (
                                <table className="org-table">
                                    <tbody>
                                    {section.content.map((row, rowIndex) => (
                                        <tr key={rowIndex} className={`row-${rowIndex}`}>
                                            {/* row.content가 배열인지 체크한 후, 배열이면 map 실행 */}
                                            {Array.isArray(row.content) ? (
                                                row.content.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className={`column-${cellIndex}`}>
                                                        <div>{typeof cell === "string" ? cell : documentToReactComponents(cell)}</div>
                                                    </td>
                                                ))
                                            ) : (
                                                <td key={rowIndex} className={`column-${rowIndex}`}>
                                                    <div>{typeof row.content === "string" ? row.content : documentToReactComponents(row.content)}</div>
                                                </td>
                                            )}

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* ✅ org2도 모바일처럼 적용 */}
            {archiveNew?.org2 && (
                <div className="org2-container">
                    {archiveNew.org2.content.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="section">
                            {section.content.length === 1 ? (
                                <h4 className="section-title">
                                    {documentToReactComponents(section.content[0])}
                                </h4>
                            ) : (
                                <table className="org2-table">
                                    <tbody>
                                    {section.content.map((row, rowIndex) => (
                                        <tr key={rowIndex} className={`row-${rowIndex}`}>
                                            {/* row.content가 배열인지 체크한 후, 배열이면 map 실행 */}
                                            {Array.isArray(row.content) ? (
                                                row.content.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className={`column-${cellIndex}`}>
                                                        <div>{typeof cell === "string" ? cell : documentToReactComponents(cell)}</div>
                                                    </td>
                                                ))
                                            ) : (
                                                <td key={rowIndex} className={`column-${rowIndex}`}>
                                                    <div>{typeof row.content === "string" ? row.content : documentToReactComponents(row.content)}</div>
                                                </td>
                                            )}

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
