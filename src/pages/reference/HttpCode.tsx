import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const httpCodes = [
  { code: '100', meaning: 'Continue. The client should continue with its request.' },
  { code: '101', meaning: 'Switching Protocols. The server is switching protocols as requested by the client.' },
  { code: '102', meaning: 'Processing. A WebDAV request may contain many sub-requests involving file operations.' },
  { code: '200', meaning: 'OK. The request has succeeded.' },
  { code: '201', meaning: 'Created. The request has been fulfilled and resulted in a new resource being created.' },
  { code: '202', meaning: 'Accepted. The request has been accepted for processing, but the processing has not been completed.' },
  { code: '203', meaning: 'Non-Authoritative Information. The returned meta information is not the definitive set.' },
  { code: '204', meaning: 'No Content. The server successfully processed the request but is not returning any content.' },
  { code: '205', meaning: 'Reset Content. The server successfully processed the request, but is not returning any content.' },
  { code: '206', meaning: 'Partial Content. The server is delivering only part of the resource.' },
  { code: '300', meaning: 'Multiple Choices. The requested resource has multiple choices.' },
  { code: '301', meaning: 'Moved Permanently. The requested resource has been assigned a new permanent URI.' },
  { code: '302', meaning: 'Found. The requested resource resides temporarily under a different URI.' },
  { code: '303', meaning: 'See Other. The response to the request can be found under a different URI.' },
  { code: '304', meaning: 'Not Modified. If the client has performed a conditional GET request and access is allowed, but the document has not been modified.' },
  { code: '307', meaning: 'Temporary Redirect. The requested resource resides temporarily under a different URI.' },
  { code: '400', meaning: 'Bad Request. The request could not be understood by the server due to malformed syntax.' },
  { code: '401', meaning: 'Unauthorized. The request requires user authentication.' },
  { code: '403', meaning: 'Forbidden. The server understood the request, but is refusing to fulfill it.' },
  { code: '404', meaning: 'Not Found. The server has not found anything matching the Request-URI.' },
  { code: '405', meaning: 'Method Not Allowed. The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.' },
  { code: '408', meaning: 'Request Timeout. The client did not produce a request within the time that the server was prepared to wait.' },
  { code: '409', meaning: 'Conflict. The request could not be completed due to a conflict with the current state of the resource.' },
  { code: '410', meaning: 'Gone. The requested resource is no longer available at the server.' },
  { code: '500', meaning: 'Internal Server Error. The server encountered an unexpected condition which prevented it from fulfilling the request.' },
  { code: '501', meaning: 'Not Implemented. The server does not support the functionality required to fulfill the request.' },
  { code: '502', meaning: 'Bad Gateway. The server, while acting as a gateway or proxy, received an invalid response from the upstream server.' },
  { code: '503', meaning: 'Service Unavailable. The server is currently unable to handle the request due to a temporary overloading or maintenance.' },
  { code: '504', meaning: 'Gateway Timeout. The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.' },
  { code: '505', meaning: 'HTTP Version Not Supported. The server does not support the HTTP protocol version used in the request.' },
];

export const HttpCode = () => {
  const [searchText, setSearchText] = useState('');

  const filteredCodes = useMemo(() => {
    if (!searchText) return httpCodes;
    return httpCodes.filter(
      item =>
        item.code.includes(searchText) ||
        item.meaning.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">HTTP Status Code Reference</h1>
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <Input
              placeholder="Search status code or meaning"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 font-semibold">Status Code</th>
                  <th className="text-left p-3 font-semibold">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {filteredCodes.map((item) => (
                  <tr key={item.code} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.code}</td>
                    <td className="p-3">{item.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
