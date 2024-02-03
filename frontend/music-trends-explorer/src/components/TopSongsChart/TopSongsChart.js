import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useMusicChartData } from '../../contexts/MusicChartDataProvider'; // Adjust the import path

const TopSongsChart = () => {
  const chartRef = useRef();
  const { musicChartData, isLoading, error } = useMusicChartData(); // Use the hook to access the context

  useEffect(() => {
    if (isLoading || error || !musicChartData) {
      // Handle loading state, errors, or undefined data here
      return;
    }

    // Extract the relevant data from musicChartData
    const data = musicChartData.map((item) => ({
      date: new Date(item.chart_week), // Assuming 'chart_week' contains date strings
      rank: item.peak_pos, // Assuming 'peak_pos' contains rank data
    }));

    // Set the dimensions and margins of the chart
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Append the SVG container to the chartRef
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set the scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.rank), d3.max(data, (d) => d.rank)])
      .nice()
      .range([height, 0]);

    // Line generator
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.rank));

    // Add the line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add x-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    svg.append('g').call(d3.axisLeft(y));

    // Cleanup
    return () => {
      svg.selectAll('*').remove();
    };
  }, [musicChartData, isLoading, error]); // Update the chart when musicChartData changes

  return <div ref={chartRef}></div>;
};

export default TopSongsChart;
