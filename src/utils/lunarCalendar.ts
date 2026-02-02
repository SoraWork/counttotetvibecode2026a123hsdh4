/**
 * Lunar Calendar Utility
 * 
 * Tính toán ngày Tết Nguyên Đán (Lunar New Year) theo Dương lịch.
 * Tết rơi vào ngày mùng 1 tháng Giêng âm lịch.
 * 
 * Thuật toán: Sử dụng bảng tra cứu (lookup table) cho các năm phổ biến.
 * Đây là cách tiếp cận đơn giản và chính xác nhất vì tính toán lịch âm
 * phức tạp (liên quan đến thiên văn học, múi giờ, v.v.)
 */

/**
 * Bảng tra cứu ngày Tết theo năm Dương lịch
 * Format: [năm, tháng (0-indexed), ngày]
 * 
 * Nguồn: Lịch âm Việt Nam chính thống
 */
const TET_DATES: Record<number, [number, number, number]> = {
  2020: [2020, 0, 25],  // 25/1/2020
  2021: [2021, 1, 12],  // 12/2/2021
  2022: [2022, 1, 1],   // 1/2/2022
  2023: [2023, 0, 22],  // 22/1/2023
  2024: [2024, 1, 10],  // 10/2/2024
  2025: [2025, 0, 29],  // 29/1/2025
  2026: [2026, 1, 17],  // 17/2/2026
  2027: [2027, 1, 6],   // 6/2/2027
  2028: [2028, 0, 26],  // 26/1/2028
  2029: [2029, 1, 13],  // 13/2/2029
  2030: [2030, 1, 3],   // 3/2/2030
  2031: [2031, 0, 23],  // 23/1/2031
  2032: [2032, 1, 11],  // 11/2/2032
  2033: [2033, 0, 31],  // 31/1/2033
  2034: [2034, 1, 19],  // 19/2/2034
  2035: [2035, 1, 8],   // 8/2/2035
};

/**
 * Lấy ngày Tết Nguyên Đán cho một năm cụ thể
 * 
 * @param year - Năm Dương lịch cần tra cứu
 * @returns Date object đại diện cho ngày Tết (00:00:00 giờ địa phương)
 * @throws Error nếu năm không có trong bảng tra cứu
 * 
 * @example
 * ```ts
 * const tet2025 = getTetDate(2025); // Returns Date(2025, 0, 29)
 * console.log(tet2025.toLocaleDateString('vi-VN')); // "29/01/2025"
 * ```
 */
export function getTetDate(year: number): Date {
  const tetData = TET_DATES[year];
  
  if (!tetData) {
    throw new Error(
      `Không tìm thấy dữ liệu Tết cho năm ${year}. ` +
      `Năm hỗ trợ: ${Object.keys(TET_DATES).join(', ')}`
    );
  }
  
  // Tạo Date object với giờ 00:00:00
  // Month trong JavaScript bắt đầu từ 0 (January = 0)
  const [y, m, d] = tetData;
  return new Date(y, m, d, 0, 0, 0, 0);
}

/**
 * Lấy danh sách các năm có sẵn trong bảng tra cứu
 * 
 * @returns Mảng các năm được sắp xếp tăng dần
 */
export function getAvailableYears(): number[] {
  return Object.keys(TET_DATES)
    .map(Number)
    .sort((a, b) => a - b);
}

/**
 * Kiểm tra một năm có trong bảng tra cứu không
 * 
 * @param year - Năm cần kiểm tra
 * @returns true nếu năm có dữ liệu
 */
export function hasYearData(year: number): boolean {
  return year in TET_DATES;
}

// ============================================================
// TEST CASES (Development only - xóa hoặc comment khi deploy)
// ============================================================

if (import.meta.env.DEV) {
  console.log('=== LUNAR CALENDAR TESTS ===');
  
  // Test 1: Các năm cơ bản
  const testYears = [2024, 2025, 2026];
  testYears.forEach(year => {
    const tet = getTetDate(year);
    console.log(`Tết ${year}:`, tet.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  });
  
  // Test 2: Available years
  console.log('Available years:', getAvailableYears());
  
  // Test 3: Error handling
  try {
    getTetDate(1999);
  } catch (error) {
    console.log('Expected error for year 1999:', (error as Error).message);
  }
  
  console.log('=========================');
}
