import { useState } from 'react';
import { Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { X, FileText } from 'lucide-react';

export const TextDiff = () => {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');

  // 计算最长公共子序列 (LCS)
  const computeLCS = (leftLines: string[], rightLines: string[]): number[][] => {
    const m = leftLines.length;
    const n = rightLines.length;
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (leftLines[i - 1] === rightLines[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    return dp;
  };

  // 回溯 LCS 找出匹配的行
  const findMatches = (leftLines: string[], rightLines: string[], dp: number[][]): Map<number, number> => {
    const matches = new Map<number, number>();
    let i = leftLines.length;
    let j = rightLines.length;

    while (i > 0 && j > 0) {
      if (leftLines[i - 1] === rightLines[j - 1]) {
        matches.set(i - 1, j - 1);
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    return matches;
  };

  const getDiffLines = () => {
    const leftLines = left.split('\n');
    const rightLines = right.split('\n');

    // 如果两个文本都为空
    if (leftLines.length === 0 && rightLines.length === 0) {
      return [];
    }

    // 计算 LCS
    const dp = computeLCS(leftLines, rightLines);
    const matches = findMatches(leftLines, rightLines, dp);

    // 创建反向映射（right -> left）
    const rightToLeft = new Map<number, number>();
    matches.forEach((rightIdx, leftIdx) => {
      rightToLeft.set(rightIdx, leftIdx);
    });

    const diff: Array<{ 
      left: string; 
      right: string; 
      type: 'same' | 'diff' | 'left-only' | 'right-only';
      leftLineNumber?: number;
      rightLineNumber?: number;
    }> = [];

    let leftIdx = 0;
    let rightIdx = 0;

    // 使用双指针遍历两个文本
    while (leftIdx < leftLines.length || rightIdx < rightLines.length) {
      const leftLine = leftLines[leftIdx];
      const rightLine = rightLines[rightIdx];

      // 如果左侧行匹配到右侧行
      if (leftIdx < leftLines.length && matches.has(leftIdx)) {
        const matchedRightIdx = matches.get(leftIdx)!;
        
        // 处理右侧在匹配行之前的未匹配行（新增的行）
        while (rightIdx < matchedRightIdx) {
          diff.push({
            left: '',
            right: rightLines[rightIdx],
            type: 'right-only',
            rightLineNumber: rightIdx + 1,
          });
          rightIdx++;
        }

        // 添加匹配的行
        diff.push({
          left: leftLine,
          right: rightLines[matchedRightIdx],
          type: 'same',
          leftLineNumber: leftIdx + 1,
          rightLineNumber: matchedRightIdx + 1,
        });
        leftIdx++;
        rightIdx = matchedRightIdx + 1;
      }
      // 如果右侧行匹配到左侧行
      else if (rightIdx < rightLines.length && rightToLeft.has(rightIdx)) {
        const matchedLeftIdx = rightToLeft.get(rightIdx)!;
        
        // 处理左侧在匹配行之前的未匹配行（删除的行）
        while (leftIdx < matchedLeftIdx) {
          diff.push({
            left: leftLines[leftIdx],
            right: '',
            type: 'left-only',
            leftLineNumber: leftIdx + 1,
          });
          leftIdx++;
        }

        // 添加匹配的行
        diff.push({
          left: leftLines[matchedLeftIdx],
          right: rightLine,
          type: 'same',
          leftLineNumber: matchedLeftIdx + 1,
          rightLineNumber: rightIdx + 1,
        });
        leftIdx = matchedLeftIdx + 1;
        rightIdx++;
      }
      // 都没有匹配，检查是否在同一位置但内容不同（修改的行）
      else if (leftIdx < leftLines.length && rightIdx < rightLines.length) {
        // 检查后续是否有匹配，如果没有，则视为修改
        let hasFutureMatch = false;
        for (let futureLeft = leftIdx + 1; futureLeft < leftLines.length; futureLeft++) {
          if (matches.has(futureLeft) && matches.get(futureLeft)! >= rightIdx) {
            hasFutureMatch = true;
            break;
          }
        }
        for (let futureRight = rightIdx + 1; futureRight < rightLines.length; futureRight++) {
          if (rightToLeft.has(futureRight) && rightToLeft.get(futureRight)! >= leftIdx) {
            hasFutureMatch = true;
            break;
          }
        }

        if (!hasFutureMatch) {
          // 视为修改的行
          diff.push({
            left: leftLine,
            right: rightLine,
            type: 'diff',
            leftLineNumber: leftIdx + 1,
            rightLineNumber: rightIdx + 1,
          });
          leftIdx++;
          rightIdx++;
        } else {
          // 有未来匹配，优先处理删除
          diff.push({
            left: leftLine,
            right: '',
            type: 'left-only',
            leftLineNumber: leftIdx + 1,
          });
          leftIdx++;
        }
      }
      // 只有左侧有剩余行（删除）
      else if (leftIdx < leftLines.length) {
        diff.push({
          left: leftLine,
          right: '',
          type: 'left-only',
          leftLineNumber: leftIdx + 1,
        });
        leftIdx++;
      }
      // 只有右侧有剩余行（新增）
      else if (rightIdx < rightLines.length) {
        diff.push({
          left: '',
          right: rightLine,
          type: 'right-only',
          rightLineNumber: rightIdx + 1,
        });
        rightIdx++;
      }
    }

    // 过滤掉空行（left 和 right 都为空）
    return diff.filter(line => line.left.trim() !== '' || line.right.trim() !== '');
  };

  const diffLines = getDiffLines();
  const stats = {
    total: diffLines.length,
    same: diffLines.filter(l => l.type === 'same').length,
    diff: diffLines.filter(l => l.type === 'diff').length,
    leftOnly: diffLines.filter(l => l.type === 'left-only').length,
    rightOnly: diffLines.filter(l => l.type === 'right-only').length,
  };

  const handleClear = () => {
    setLeft('');
    setRight('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Text Diff</h1>
        {(left || right) && (
          <Button onClick={handleClear} variant="outline" className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Text */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Text 1 (Original)
          </label>
          <Textarea
            rows={20}
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder="Enter first text to compare..."
            className="w-full font-mono text-sm"
          />
        </div>

        {/* Right Text */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Text 2 (Modified)
          </label>
          <Textarea
            rows={20}
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder="Enter second text to compare..."
            className="w-full font-mono text-sm"
          />
        </div>
      </div>

      {/* Diff Result */}
      {(left || right) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Comparison Result
            </h2>
            {stats.total > 0 && (
              <div className="flex gap-4 text-sm text-gray-600">
                <span className="text-gray-700">Total: <strong>{stats.total}</strong></span>
                <span className="text-green-600">Same: <strong>{stats.same}</strong></span>
                <span className="text-yellow-600">Modified: <strong>{stats.diff}</strong></span>
                <span className="text-red-600">Removed: <strong>{stats.leftOnly}</strong></span>
                <span className="text-blue-600">Added: <strong>{stats.rightOnly}</strong></span>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            <div className="max-h-[600px] overflow-auto">
              <div className="min-w-full">
                {diffLines.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p>Enter text in both fields to see the comparison</p>
                  </div>
                ) : (
                  <table className="w-full border-collapse font-mono text-sm">
                    <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 w-20">Line 1</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 w-20">Line 2</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 border-l border-gray-200">Text 1</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 border-l border-gray-200">Text 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diffLines.map((line, index) => (
                        <tr
                          key={index}
                          className={`
                            border-b border-gray-100
                            ${line.type === 'same' ? 'bg-white' : ''}
                            ${line.type === 'diff' ? 'bg-yellow-50 hover:bg-yellow-100' : ''}
                            ${line.type === 'left-only' ? 'bg-red-50 hover:bg-red-100' : ''}
                            ${line.type === 'right-only' ? 'bg-green-50 hover:bg-green-100' : ''}
                          `}
                        >
                          <td className="px-3 py-1 text-xs text-gray-500 text-right font-mono">
                            {line.leftLineNumber || '-'}
                          </td>
                          <td className="px-3 py-1 text-xs text-gray-500 text-right font-mono border-l border-gray-200">
                            {line.rightLineNumber || '-'}
                          </td>
                          <td className={`
                            px-3 py-1 border-l border-gray-200
                            ${line.type === 'left-only' || line.type === 'diff' ? 'text-red-700 font-medium' : 'text-gray-800'}
                          `}>
                            {line.left || <span className="text-gray-400 italic">(empty)</span>}
                          </td>
                          <td className={`
                            px-3 py-1 border-l border-gray-200
                            ${line.type === 'right-only' || line.type === 'diff' ? 'text-green-700 font-medium' : 'text-gray-800'}
                          `}>
                            {line.right || <span className="text-gray-400 italic">(empty)</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-gray-300"></div>
              <span>Same</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-50 border border-yellow-300"></div>
              <span>Modified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-50 border border-red-300"></div>
              <span>Removed (only in Text 1)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-50 border border-green-300"></div>
              <span>Added (only in Text 2)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
